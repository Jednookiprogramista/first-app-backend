
import { createPool, Pool } from "mysql2";

export const pool: Pool = createPool({
        host: "localhost",
        user: "root",
        database: "first-app",

});

export const db = pool.promise();


