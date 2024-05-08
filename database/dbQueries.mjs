import sqlite3 from "better-sqlite3";
import { join } from "path";
const { dirname } = import.meta;

// Initialize database
const db = new sqlite3(join(dirname, "..", "database", "store.db"));

// Queries for "/products"
const getProducts = () => db.prepare("SELECT * FROM products").all();
    // return getProductsQuery.all()

const getCategory = (category) => {
    // console.log(category);
    // console.log(typeof(category));
    const getCategoryQuery = db.prepare("SELECT * FROM products WHERE LOWER(category) = ?", category);
    return getCategoryQuery.all(category);
}

const addProduct = ({name, category, stock, price}) => {
    const addProductQuery = db.prepare("INSERT INTO products (name, category, stock, price) VALUES(?, ?, ?, ?)", );
    addProductQuery.run(name, category, stock, price);
}

const getProduct = (id) => {
    const getProductQuery = db.prepare("SELECT * FROM products WHERE id = ?", id)
    return getProductQuery.get(id);
}

const deleteProduct = (id) => {
     const deleteProductQuery = db.prepare("DELETE FROM products WHERE id = ?")
     deleteProductQuery.run(id);
}

const updateProduct = ({name, category, stock, price, id}) => {
    const updateProductQuery = db.prepare("UPDATE products SET name = ?, category = ?, stock = ?, price = ? WHERE id = ?");
    updateProductQuery.run(name, category, stock, price, id);
}

///////////////////////////////////////////////

const signupUser = (email, password) => {
    console.log("--SignupFunction--");
    console.log(email);
    console.log(password);
    const signupUserQuery = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    signupUserQuery.run(email, password);
}

const loginUser = (email) => {
    const loginUserQuery = db.prepare("SELECT * FROM users WHERE email = ?");
    return loginUserQuery.get(email);
}

///////////////////////////////////////////////

const addOrder = async ({ user_id, order_date, total_price, shipping_address, products }) => {
    const addOrderQuery = db.prepare("INSERT INTO orders(user_id, order_date, total_price, shipping_address) VALUES(?, ?, ?, ?)");
    addOrderQuery.run(user_id, order_date, total_price, shipping_address);

    const lastInsertedRowId = db.prepare("SELECT last_insert_rowid() AS lastId").get().lastId

    products.forEach(e => {
        const addOrderedProductsQuery = db.prepare("INSERT INTO ordered_products(order_id, product_id) VALUES(?, ?)");
        addOrderedProductsQuery.run(lastInsertedRowId, e)
    });
}

const getAllOrders = () => db.prepare("SELECT * FROM orders").all();

const getOrder = (id) => {
    const getOrderQuery = db.prepare("SELECT * FROM orders WHERE id = ?");
    const result = getOrderQuery.get(id);
    return result ? result : null;
}

const deleteOrder = (orderId) => {
    console.log("Preparing to delete order.");
    const deleteOrderQuery = db.prepare("DELETE FROM orders WHERE id = ?");
    deleteOrderQuery.run(orderId);
    console.log("Deleted order.");
    console.log("Preparing to delete products.");

    // const deleteOrderedProductsQuery = db.prepare("DELETE FROM ordered_products WHERE id = ?");
    // deleteOrderedProductsQuery.run(orderId);
    // console.log("Deleted products.");
}


export { 
    getProducts, 
    getCategory, 
    addProduct, 
    getProduct, 
    deleteProduct, 
    updateProduct, 
    signupUser, 
    loginUser,
    getAllOrders,
    getOrder,
    addOrder,
    deleteOrder
};

