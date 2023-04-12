import { db } from "../utils/db";

describe('MySQL database connection', () => {
    test('should connect to the database', async () => {
        const pool = db.query({
            host: "localhost",
            user: "root",
            database: "first-app",
        });

        try {
            const connection = await pool.getConnection();
            connection.release();
            expect(connection.isValid()).toBeTruthy();
        } catch (error) {
            (`Could not connect to MySQL database: ${error.message}`);
        }
    });
});
