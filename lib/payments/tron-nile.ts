import "server-only";
import { createHash } from "node:crypto";

const NILE_NODE = "https://api.nileex.io";
const TRANSFER_TOPIC = "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

type TronLog = { address?: string; topics?: string[]; data?: string };
type TronInfo = { id?: string; blockNumber?: number; receipt?: { result?: string }; contractResult?: string[]; log?: TronLog[] };

function sha256(bytes: Buffer) { return createHash("sha256").update(bytes).digest(); }

export function tronBase58ToHex(address: string): string {
  if (!/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address)) throw new Error("invalid_tron_address");
  let value = 0n;
  for (const char of address) {
    const digit = ALPHABET.indexOf(char);
    if (digit < 0) throw new Error("invalid_tron_address");
    value = value * 58n + BigInt(digit);
  }
  let hex = value.toString(16);
  if (hex.length % 2) hex = `0${hex}`;
  let bytes = Buffer.from(hex, "hex");
  for (const char of address) { if (char !== "1") break; bytes = Buffer.concat([Buffer.from([0]), bytes]); }
  if (bytes.length !== 25) throw new Error("invalid_tron_address");
  const payload = bytes.subarray(0, 21);
  const checksum = bytes.subarray(21);
  const expected = sha256(sha256(payload)).subarray(0, 4);
  if (!expected.equals(checksum) || payload[0] !== 0x41) throw new Error("invalid_tron_checksum");
  return payload.toString("hex");
}

function normalizeLogAddress(value: string) {
  const normalized = value.replace(/^0x/i, "").toLowerCase();
  return normalized.length === 42 && normalized.startsWith("41") ? normalized.slice(2) : normalized;
}

export async function verifyNileTestUsdtTransfer(input: {
  txid: string;
  receiverBase58: string;
  tokenContractBase58: string;
  expectedAtomicAmount: bigint;
  fetchImpl?: typeof fetch;
}) {
  if (!/^[a-f0-9]{64}$/i.test(input.txid)) return { ok: false as const, reason: "invalid_txid" };
  if (process.env.TRON_NETWORK !== "nile") return { ok: false as const, reason: "wrong_network" };
  if (input.expectedAtomicAmount <= 0n) return { ok: false as const, reason: "invalid_amount" };
  let receiver: string, tokenContract: string;
  try { receiver = tronBase58ToHex(input.receiverBase58).slice(2).toLowerCase(); tokenContract = tronBase58ToHex(input.tokenContractBase58).slice(2).toLowerCase(); }
  catch { return { ok: false as const, reason: "invalid_address" }; }

  const fetcher = input.fetchImpl || fetch;
  let info: TronInfo;
  try {
    const response = await fetcher(`${NILE_NODE}/walletsolidity/gettransactioninfobyid`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ value: input.txid }),
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) return { ok: false as const, reason: "nile_node_unavailable" };
    info = await response.json() as TronInfo;
  } catch { return { ok: false as const, reason: "nile_node_unavailable" }; }

  if (!info.id || info.id.toLowerCase() !== input.txid.toLowerCase()) return { ok: false as const, reason: "transaction_not_solidified" };
  if (info.receipt?.result !== "SUCCESS") return { ok: false as const, reason: "transaction_failed" };
  const transfer = (info.log || []).find((log) => {
    const topics = log.topics || [];
    return normalizeLogAddress(log.address || "") === tokenContract
      && topics[0]?.replace(/^0x/i, "").toLowerCase() === TRANSFER_TOPIC
      && topics[2]?.replace(/^0x/i, "").slice(-40).toLowerCase() === receiver;
  });
  if (!transfer?.data || !/^[0-9a-f]+$/i.test(transfer.data.replace(/^0x/i, ""))) return { ok: false as const, reason: "matching_transfer_not_found" };
  const amount = BigInt(`0x${transfer.data.replace(/^0x/i, "")}`);
  if (amount !== input.expectedAtomicAmount) return { ok: false as const, reason: "wrong_amount" };
  return { ok: true as const, txid: input.txid.toLowerCase(), blockNumber: info.blockNumber ?? null, amountAtomic: amount.toString() };
}
