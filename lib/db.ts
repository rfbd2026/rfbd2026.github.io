import "server-only";
import mysql, { type Pool } from "mysql2/promise";

const globalForDb = globalThis as typeof globalThis & { arefDbPool?: Pool };

export function getDb(): Pool {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error("database_not_configured");
  if (!globalForDb.arefDbPool) {
    globalForDb.arefDbPool = mysql.createPool(uri);
  }
  return globalForDb.arefDbPool;
}
