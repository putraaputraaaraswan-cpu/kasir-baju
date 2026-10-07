import {pool,sha,need,J} from '../../../lib/server';
export async function POST(req){const [u,e]=need('admin');if(e)return e;const b=await req.json();
 try{await pool.query("INSERT INTO users(nama,username,password,role) VALUES(?,?,?, 'kasir')",[b.nama,b.username,sha(b.password)]);return J({ok:true})}
 catch(x){return J({error:x.code==='ER_DUP_ENTRY'?'Username sudah dipakai':'Gagal menyimpan'},400)}}
export async function DELETE(req){const [u,e]=need('admin');if(e)return e;
 await pool.query("DELETE FROM users WHERE id=? AND role='kasir'",[new URL(req.url).searchParams.get('id')]);return J({ok:true})}
