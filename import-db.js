const fs = require("fs");
const mysql = require("mysql2/promise");

async function main() {
  let sql = fs.readFileSync("database.sql", "utf8");

  // Jangan membuat/memilih database lokal.
  sql = sql
    .replace(/CREATE\s+DATABASE[\s\S]*?;\s*/gi, "")
    .replace(/USE\s+[`'"]?[^;`'"]+[`'"]?\s*;\s*/gi, "");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  console.log("Terhubung ke Railway MySQL...");
  await connection.query(sql);
  console.log("DATABASE.SQL BERHASIL DIIMPORT!");

  await connection.end();
}

main().catch(err => {
  console.error("IMPORT GAGAL:");
  console.error(err.message);
  process.exit(1);
});