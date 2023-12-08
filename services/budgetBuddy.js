const budgetBuddy = (db) => {
    const allProducts = async () => {
        return await db.manyOrNone("select * from products");
    };

    const createProduct = async (product, price, categoryId) => {
        const data = [
            product,
            price,
            categoryId
        ];
        const values = `values ($1, $2, $3)`;
        const query = `insert into products (product, price, category_id) ${values}`;
        // Create a product
        await db.none(query, data);
    };

    const categories = async () => {
        return db.manyOrNone(
            `select categories.category_type, count(products.product_id) as product_count
             from categories left join products ON categories.category_id = products.category_id
             group by categories.category_type 
             `);
    };

    const categoryUser = async (user_id) => {
        return db.manyOrNone(`select c.category_type, count(uc.user_id) AS user_count
                              from categories c left join user_categories uc ON c.category_id = uc.category_id
                              where u.user_id = ${user_id} group by c.category_type;
                              `)
    };

    const productsUser = async (user_id) => {
        return db.manyOrNone(`select u.user_id, u.username, count(up.product_id) AS product_count
                              from user_table u left join user_products up ON u.user_id = up.user_id
                              where u.user_id = ${user_id} group by u.user_id, u.username;
                              `)
    }

    return {
        allProducts,
        createProduct,
        categories,
        categoryUser,
        productsUser
    };
};

export default budgetBuddy;