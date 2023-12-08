const registerUsers = (db) => {

    const registeredUsers = async () => {
        console.log("Fetching registered users");
        return await db.manyOrNone("SELECT * FROM user_table");
    };

    const createUser = async ({ username, email, password, categories, spendingLimit }) => {
        console.log("createUser called with:", { username, email, password: '***', categories, spendingLimit });
        
        // Start transaction
        if (!username || !email || !password || !categories || typeof spendingLimit === 'undefined') {
            console.error("Missing required fields");
            throw new Error('Missing required fields');
        }
        
        try {
            let createdUser;
            await db.tx(async t => {
                // Check if email already exists
                console.log("Checking for existing user with email:", email);
                const existingUser = await t.oneOrNone('SELECT * FROM user_table WHERE email = $1', [email.toLowerCase()]);
                if (existingUser) {
                    console.error("Email already in use:", email);
                    throw new Error('Email already in use. Please use a different email.');
                }
        
                // Insert user into user_table
                console.log("Inserting user:", { username, email });
                const userQuery = `INSERT INTO user_table (username, email, password_hash, spending_limit) VALUES ($1, $2, $3, $4) RETURNING user_id`;
                const userData = [username.toLowerCase(), email.toLowerCase(), password, spendingLimit];
                createdUser = await t.one(userQuery, userData);
                console.log("User inserted:", createdUser);

                // Convert category names to IDs with case-insensitive matching
                console.log("Converting categories to IDs for:", categories);
                const categoryIds = await Promise.all(categories.map(async categoryName => {
                    const category = await t.oneOrNone('SELECT category_id FROM categories WHERE LOWER(category_type) = LOWER($1)', [categoryName]);
                    return category ? category.category_id : null;
                }));

                // Filter out any null values (categories not found)
                const validCategoryIds = categoryIds.filter(id => id !== null);
                console.log("Valid category IDs:", validCategoryIds);

                // Insert categories into user_categories
                console.log("Inserting categories into user_categories for user_id:", createdUser.user_id);
                const categoryQueries = validCategoryIds.map(categoryId => {
                    return t.none(`INSERT INTO user_categories (user_id, category_id) VALUES ($1, $2)`, [createdUser.user_id, categoryId]);
                });

                await t.batch(categoryQueries);
                console.log("Categories successfully inserted");
            });
            console.log("User creation transaction completed");
            return createdUser; // Return the created user object
        } catch (error) {
            console.error("Error in createUser:", error);
            throw error; // Rethrow the error for further handling
        }
    };

    return { createUser, registeredUsers };
};

export default registerUsers;
