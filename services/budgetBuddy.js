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

    return {
        allProducts,
        createProduct,
        categories
    };
};

export default budgetBuddy;