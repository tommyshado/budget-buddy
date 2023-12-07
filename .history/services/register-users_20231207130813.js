// register-users.js
const registerUsers = (db) => {

    const registeredUsers = async () => {
        return await db.manyOrNone("SELECT * FROM user_table");
    };

    const createUser = async ({ username, email, password, categories, spendingLimit, financialGoals }) => {
        const data = [username.toLowerCase(), email.toLowerCase(), password, JSON.stringify(categories), spendingLimit, financialGoals];
        const query = `INSERT INTO user_table (username, email, password_hash, categories, spending_limit, financial_goals) VALUES ($1, $2, $3, $4, $5, $6)`;
        await db.none(query, data);
    };

    return { createUser, registeredUsers };
};

export default registerUsers;
