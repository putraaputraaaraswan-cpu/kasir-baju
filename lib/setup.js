import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
export async function runSetup(){
 const sql=fs.readFileSync(path.join(process.cwd(),'database.sql'),'utf8');
 const cn=await mysql.createConnection({host:process.env.DB_HOST,port:+(process.env.DB_PORT||3306),user:process.env.DB_USER,password:process.env.DB_PASS||'',multipleStatements:true});
 try{await cn.query(sql)}finally{await cn.end()}
}
