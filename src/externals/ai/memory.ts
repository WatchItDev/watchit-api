import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres';
import { Pool } from 'pg';

export const PostgresCheckpoint = async () => {
  const pool = new Pool({
    user: process.env.API_PG_USER,
    password: process.env.API_PG_PASSWORD,
    host: process.env.API_PG_HOST,
    port: process.env.API_PG_PORT as unknown as number,
  });

  const chk = new PostgresSaver(pool);
  await chk.setup();
  return chk;
};

export type PostgresCheckpointType = ReturnType<typeof PostgresCheckpoint>;
