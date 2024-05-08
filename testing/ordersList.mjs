const orderList = [
    {
        orderId: 1001,
        customerId: 301,
        orderDate: "2024-04-20",
        products: [
            { productId: 101, quantity: 2, pricePerItem: 19.99 },
            { productId: 103, quantity: 1, pricePerItem: 39.99 }
        ],
        status: "shipped",
        totalCost: 79.97,
        shippingAddress: "123 Main St, Anytown, CA 90210",
        paymentMethod: "credit card"
    },
    {
        orderId: 1002,
        customerId: 302,
        orderDate: "2024-04-22",
        products: [
            { productId: 106, quantity: 1, pricePerItem: 59.99 },
            { productId: 107, quantity: 3, pricePerItem: 4.99 }
        ],
        status: "pending",
        totalCost: 74.96,
        shippingAddress: "456 Maple Ave, Sometown, NY 10001",
        paymentMethod: "PayPal"
    },
    {
        orderId: 1003,
        customerId: 303,
        orderDate: "2024-04-21",
        products: [
            { productId: 108, quantity: 5, pricePerItem: 3.99 },
            { productId: 109, quantity: 2, pricePerItem: 12.99 }
        ],
        status: "cancelled",
        totalCost: 37.95,
        shippingAddress: "789 Elm St, Othertown, TX 75001",
        paymentMethod: "debit card"
    },
    {
        orderId: 1004,
        customerId: 304,
        orderDate: "2024-04-19",
        products: [
            { productId: 110, quantity: 1, pricePerItem: 22.99 },
            { productId: 104, quantity: 2, pricePerItem: 9.99 }
        ],
        status: "delivered",
        totalCost: 42.97,
        shippingAddress: "321 Oak St, Anothertown, FL 33101",
        paymentMethod: "credit card"
    },
    {
        orderId: 1005,
        customerId: 305,
        orderDate: "2024-04-23",
        products: [
            { productId: 105, quantity: 4, pricePerItem: 24.99 },
            { productId: 102, quantity: 1, pricePerItem: 29.99 }
        ],
        status: "pending",
        totalCost: 129.95,
        shippingAddress: "654 Pine St, Smalltown, NV 89001",
        paymentMethod: "bank transfer"
    }
];

export default orderList;