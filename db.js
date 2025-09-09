import 'dotenv/config'

import postgres from 'postgres'

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const URL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`;

export const sql = postgres(URL, { ssl: 'require '});

//variávies ambiente são variáveis secretas (por ex. banco de dados)
//que são diferentes enquanto a aplicação estiver em desenvolvimento e enquanto estiver online, em produção