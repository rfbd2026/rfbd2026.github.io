import type { RGB } from "@/lib/color";

function writeU16(view: DataView, offset: number, value: number) { view.setUint16(offset, value, false); }
function writeU32(view: DataView, offset: number, value: number) { view.setUint32(offset, value, false); }

function utf16be(value: string): Uint8Array {
  const bytes = new Uint8Array((value.length + 1) * 2);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < value.length; i += 1) writeU16(view, i * 2, value.charCodeAt(i));
  writeU16(view, value.length * 2, 0);
  return bytes;
}

export function createAse(colors: RGB[]): Blob {
  if (!colors.length || colors.length > 256) throw new Error("An ASE palette must contain between 1 and 256 colors.");
  const blocks: Uint8Array[] = colors.map((color, index) => {
    const name = utf16be(`Palette ${String(index + 1).padStart(2, "0")}`);
    const body = new Uint8Array(2 + name.length + 4 + 16 + 2);
    const view = new DataView(body.buffer);
    writeU16(view, 0, name.length / 2);
    body.set(name, 2);
    const modelOffset = 2 + name.length;
    body.set(new TextEncoder().encode("RGB "), modelOffset);
    const valuesOffset = modelOffset + 4;
    view.setFloat32(valuesOffset, color.r / 255, false);
    view.setFloat32(valuesOffset + 4, color.g / 255, false);
    view.setFloat32(valuesOffset + 8, color.b / 255, false);
    view.setFloat32(valuesOffset + 12, 1, false);
    writeU16(view, valuesOffset + 16, 0);
    const block = new Uint8Array(6 + body.length);
    const blockView = new DataView(block.buffer);
    writeU16(blockView, 0, 0x0001);
    writeU32(blockView, 2, body.length);
    block.set(body, 6);
    return block;
  });

  const total = 12 + blocks.reduce((sum, block) => sum + block.length, 0);
  const output = new Uint8Array(total);
  output.set(new TextEncoder().encode("ASEF"), 0);
  const header = new DataView(output.buffer);
  writeU16(header, 4, 1);
  writeU16(header, 6, 0);
  writeU32(header, 8, blocks.length);
  let offset = 12;
  for (const block of blocks) { output.set(block, offset); offset += block.length; }
  return new Blob([output], { type: "application/octet-stream" });
}
