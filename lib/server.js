import mysql from 'mysql2/promise';
import crypto from 'crypto';
import { cookies } from 'next/headers';
export const pool = global._pool || (global._pool = mysql.createPool({host:process.env.DB_HOST,port:+(process.env.DB_PORT||3306),user:process.env.DB_USER,password:process.env.DB_PASS||'',database:process.env.DB_NAME,connectionLimit:5}));
const SEC=process.env.SECRET||'futsal-secret';
const sig=v=>crypto.createHmac('sha256',SEC).update(v).digest('hex');
export const sha=s=>crypto.createHash('sha256').update(String(s)).digest('hex');
export const J=(d,s=200)=>Response.json(d,{status:s});
export function setSession(u){const v=Buffer.from(JSON.stringify(u)).toString('base64url');cookies().set('fs',v+'.'+sig(v),{httpOnly:true,path:'/',maxAge:86400,sameSite:'lax'})}
export function clearSession(){cookies().delete('fs')}
export function session(){const c=cookies().get('fs')?.value;if(!c)return null;const [v,s]=c.split('.');if(!s||sig(v)!==s)return null;try{return JSON.parse(Buffer.from(v,'base64url').toString())}catch{return null}}
export function need(role){const u=session();if(!u)return [null,J({error:'Belum login'},401)];if(role&&u.role!==role)return [null,J({error:'Tidak diizinkan'},403)];return [u,null]}
