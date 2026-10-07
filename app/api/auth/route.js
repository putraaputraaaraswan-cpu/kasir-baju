import {pool,sha,setSession,clearSession,session,J} from '../../../lib/server';
import {runSetup} from '../../../lib/setup';
export const dynamic='force-dynamic';
const find=async b=>(await pool.query('SELECT id,nama,username,role FROM users WHERE username=? AND password=?',[b.username,sha(b.password)]))[0];
export async function GET(){const u=session();return u?J(u):J({error:'Belum login'},401)}
export async function POST(req){const b=await req.json();let r;
 try{r=await find(b)}catch(e){
  if(e.code==='ER_BAD_DB_ERROR'||e.code==='ER_NO_SUCH_TABLE'){
   try{await runSetup();r=await find(b)}catch(x){return J({error:'Database: '+x.message},500)}
  }else return J({error:'Database: '+e.message},500)}
 if(!r.length)return J({error:'Username atau password salah'},401);
 const u={...r[0],id:String(r[0].id)};setSession(u);return J(u)}
export async function DELETE(){clearSession();return J({ok:true})}
