// register-users.js
const registerUsers = (db) => {

    const registeredUsers = async () => {
        return await db.manyOrNone("SELECT * FROM user_table");
    };

    const createUser = async ({ usernameOrEmail, password, categories, spendingLimit, financialGoals }) => {
        const data = [usernameOrEmail.toLowerCase(), password, JSON.stringify(categories), spendingLimit, financialGoals];
        const query = `INSERT INTO user_table (username_or_email, password_hash, categories, spending_limit, financial_goals) VALUES ($1, $2, $3, $4, $5)`;
        await db.none(query, data);
    };

    return { createUser, registeredUsers };
};

export default registerUsers;
