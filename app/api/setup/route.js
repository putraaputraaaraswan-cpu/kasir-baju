import {runSetup} from '../../../lib/setup';
export const dynamic='force-dynamic';
export async function GET(){
 try{await runSetup();return new Response('Database kasir_baju siap. Buka http://localhost:3000 dan login.')}
 catch(e){return new Response('Gagal: '+e.message,{status:500})}
}
