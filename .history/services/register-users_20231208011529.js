const registerUsers = (db) => {

    const registeredUsers = async () => {
        return await db.manyOrNone("SELECT * FROM user_table");
    };

    const createUser = async ({ username, email, password, categories, spendingLimit }) => {
        // Start transaction
        await db.tx(async t => {
            // Check if email already exists
            const existingUser = await t.oneOrNone('SELECT * FROM user_table WHERE email = $1', [email.toLowerCase()]);
            if (existingUser) {
                throw new Error('Email already in use. Please use a different email.');
            }
    
            // Insert user into user_table
            const userQuery = `INSERT INTO user_table (username, email, password_hash, spending_limit) VALUES ($1, $2, $3, $4) RETURNING user_id`;
            const userData = [username.toLowerCase(), email.toLowerCase(), password, spendingLimit];
            const user = await t.one(userQuery, userData);
            req.session.userId = user.user_id;
    
            // Convert category names to IDs
            const categoryIds = await Promise.all(categories.map(async categoryName => {
                const category = await t.oneOrNone('SELECT category_id FROM categories WHERE category_type = $1', categoryName);
                return category ? category.category_id : null;
            }));
    
            // Filter out any null values (categories not found)
            const validCategoryIds = categoryIds.filter(id => id !== null);
    
            // Insert categories into user_categories
            const categoryQueries = validCategoryIds.map(categoryId => {
                return t.none(`INSERT INTO user_categories (user_id, category_id) VALUES ($1, $2)`, [user.user_id, categoryId]);
            });
    
            await t.batch(categoryQueries);
        });
        // Transaction is automatically committed here
    };
    
    return { createUser, registeredUsers };
};

export default registerUsers;


