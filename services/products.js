const products = (db) => {
    const all = () => {
        return db.manyOrNone("select * from products");
    };

    const createProduct = async ({ product, price, categoryId }) => {
        const data = [
            product,
            price,
            categoryId
        ];
        const values = `values $1, $2, $3`;
        const query = `insert into products (product, price, category_id) ${values}`;
        // Create a product
        await db.none(query, data);
    };

    return {
        all,
        createProduct,
    };
};

export default products;