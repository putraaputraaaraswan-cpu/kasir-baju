import {pool,need,J} from '../../../lib/server';
export const dynamic='force-dynamic';
export async function GET(){const [u,e]=need();if(e)return e;
 const [p]=await pool.query('SELECT * FROM products ORDER BY id');
 const [us]=await pool.query('SELECT id,nama,username,role FROM users');
 const [t]=await pool.query('SELECT * FROM trx ORDER BY tgl');
 return J({products:p.map(x=>({...x,id:String(x.id)})),users:us.map(x=>({...x,id:String(x.id)})),
  trx:t.map(x=>({id:String(x.id),no:x.no,tgl:x.tgl,kasir:x.kasir,kasirU:x.kasir_u,items:typeof x.items==='string'?JSON.parse(x.items):x.items,total:x.total,bayar:x.bayar,kembali:x.kembali,metode:x.metode}))})}
