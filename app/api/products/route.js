import {pool,need,J} from '../../../lib/server';
export async function POST(req){const [u,e]=need('admin');if(e)return e;const b=await req.json();
 const [r]=await pool.query('INSERT INTO products(kode,nama,kat,harga,stok) VALUES(?,?,?,?,?)',['TMP',b.nama,b.kat,+b.harga,+b.stok]);
 await pool.query('UPDATE products SET kode=? WHERE id=?',['BRG-'+String(r.insertId).padStart(3,'0'),r.insertId]);return J({ok:true})}
export async function PATCH(req){const [u,e]=need('admin');if(e)return e;const b=await req.json();
 if(!(+b.stok>=0))return J({error:'Stok tidak valid'},400);
 await pool.query('UPDATE products SET stok=? WHERE id=?',[+b.stok,b.id]);return J({ok:true})}
export async function DELETE(req){const [u,e]=need('admin');if(e)return e;
 await pool.query('DELETE FROM products WHERE id=?',[new URL(req.url).searchParams.get('id')]);return J({ok:true})}
