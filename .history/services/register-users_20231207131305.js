const registerUsers = (db) => {

    const registeredUsers = async () => {
        return await db.manyOrNone("SELECT * FROM user_table");
    };

    const createUser = async ({ username, email, password, categories }) => {
        // Start transaction
        await db.tx(async t => {
            // Insert user into user_table
            const userQuery = `INSERT INTO user_table (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id`;
            const userData = [username.toLowerCase(), email.toLowerCase(), password];
            const userId = await t.one(userQuery, userData);

            // Insert categories into user_categories
            const categoryQueries = categories.map(categoryId => {
                return t.none(`INSERT INTO user_categories (user_id, category_id) VALUES ($1, $2)`, [userId.user_id, categoryId]);
            });

            await t.batch(categoryQueries);
        });

        // Transaction is automatically committed here
    };

    return { createUser, registeredUsers };
};

export default registerUsers;

