-- table for registering users into the app
CREATE TABLE user_table (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- table for all the available categories
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_type VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE user_categories (
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (user_id, category_id),
    FOREIGN KEY (user_id) REFERENCES user_table(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);


-- table for all the products
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product TEXT NOT NULL,
    price NUMERIC,

    -- foreign keys
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
