import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not available in this runtime.");
  process.exit(1);
}

const connection = await mysql.createConnection(databaseUrl);
try {
  await connection.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(190) NOT NULL PRIMARY KEY,
    applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

  const directory = path.join(process.cwd(), "db", "migrations");
  const migrations = fs.readdirSync(directory).filter((file) => file.endsWith(".sql")).sort();
  for (const file of migrations) {
    const [rows] = await connection.execute("SELECT version FROM schema_migrations WHERE version = ? LIMIT 1", [file]);
    if (rows.length) continue;
    const sql = fs.readFileSync(path.join(directory, file), "utf8");
    const statements = sql.split(/;\s*(?:\r?\n|$)/).map((statement) => statement.trim()).filter(Boolean);
    for (const statement of statements) await connection.query(statement);
    await connection.execute("INSERT INTO schema_migrations (version) VALUES (?)", [file]);
    console.log(`Applied ${file}`);
  }
} finally {
  await connection.end();
}
