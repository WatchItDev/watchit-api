'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PostgresCheckpoint = void 0;
const pg_1 = require('pg');
const langgraph_checkpoint_postgres_1 = require('@langchain/langgraph-checkpoint-postgres');
const PostgresCheckpoint = async () => {
  const pool = new pg_1.Pool({
    user: process.env.API_PG_USER,
    password: process.env.API_PG_PASSWORD,
    host: process.env.API_PG_HOST,
    port: process.env.API_PG_PORT,
  });
  const chk = new langgraph_checkpoint_postgres_1.PostgresSaver(pool);
  await chk.setup();
  return chk;
};
exports.PostgresCheckpoint = PostgresCheckpoint;
//# sourceMappingURL=memory.js.map
