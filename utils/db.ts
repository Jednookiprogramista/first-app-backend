

import { createPool, Pool } from "mysql2";

export const pool: Pool = createPool({
        host: "localhost",
        user: "root",
        password: "password",
        database: "my_database",
});

export const db = pool.promise();
