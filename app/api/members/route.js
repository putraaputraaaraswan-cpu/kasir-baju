import {pool,need,J} from '../../../lib/server';

async function ensureMembers(){
 await pool.query("CREATE TABLE IF NOT EXISTS members(id INT AUTO_INCREMENT PRIMARY KEY,nama VARCHAR(100) NOT NULL,telepon VARCHAR(30) NOT NULL UNIQUE,alamat VARCHAR(255) NOT NULL DEFAULT '',created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");
}

export async function GET(){
 const [u,e]=need();if(e)return e;
 try{
  await ensureMembers();
  const [members]=await pool.query('SELECT id,nama,telepon,alamat FROM members ORDER BY id DESC');
  return J(members.map(m=>({...m,id:String(m.id)})));
 }catch(x){return J({error:'Gagal memuat daftar member'},500)}
}

export async function POST(req){
 const [u,e]=need();if(e)return e;
 const b=await req.json(),nama=String(b.nama||'').trim(),telepon=String(b.telepon||'').trim(),alamat=String(b.alamat||'').trim();
 if(!nama||!telepon||nama.length>100||telepon.length>30||alamat.length>255)return J({error:'Nama, nomor HP, atau alamat tidak valid'},400);
 try{
  await ensureMembers();
  const [r]=await pool.query('INSERT INTO members(nama,telepon,alamat) VALUES(?,?,?)',[nama,telepon,alamat]);
  return J({id:String(r.insertId),nama,telepon,alamat});
 }catch(x){
  if(x.code==='ER_DUP_ENTRY')return J({error:'Nomor HP/WhatsApp sudah terdaftar'},409);
  return J({error:'Gagal mendaftarkan member'},500);
 }
}
