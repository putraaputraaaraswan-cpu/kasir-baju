import {pool,need,J} from '../../../lib/server';
export async function POST(req){const [u,e]=need();if(e)return e;const b=await req.json();
 const cn=await pool.getConnection();
 try{await cn.beginTransaction();let total=0;const items=[];
  for(const it of b.items||[]){const [[p]]=await cn.query('SELECT * FROM products WHERE id=? FOR UPDATE',[it.id]);const q=+it.qty;
   if(!p||q<1||p.stok<q)throw new Error('Stok tidak cukup: '+(p?p.nama:it.id));
   await cn.query('UPDATE products SET stok=stok-? WHERE id=?',[q,p.id]);items.push({id:String(p.id),nama:p.nama,harga:p.harga,qty:q});total+=p.harga*q}
  if(!items.length||+b.bayar<total)throw new Error('Pembayaran kurang dari total');
  const [[c]]=await cn.query('SELECT COUNT(*) c FROM trx');
  const no='TRX'+new Date().toISOString().slice(0,10).replace(/-/g,'')+String(c.c+1).padStart(3,'0');
  const [r]=await cn.query('INSERT INTO trx(no,tgl,kasir,kasir_u,items,total,bayar,kembali,metode) VALUES(?,NOW(),?,?,?,?,?,?,?)',[no,u.nama,u.username,JSON.stringify(items),total,+b.bayar,+b.bayar-total,b.metode||'Tunai']);
  await cn.commit();return J({id:String(r.insertId),no})}
 catch(x){await cn.rollback();return J({error:x.message},400)}finally{cn.release()}}
