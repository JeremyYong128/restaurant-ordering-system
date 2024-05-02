module.exports = function(app) {
    // Create MenuItem entries
    const MenuItem = app.models.MenuItem;

    const menuItems = [{
        "name": "Curry Chicken",
        "price": 5.9
    }, {
        "name": "Ice Cream",
        "price": 2
    }]

    MenuItem.create(menuItems, (err, menuItem) => {
        if (err) {
            console.error("Error creating MenuItem:", err);
        } else {
            console.log("MenuItem created:", menuItem);
        }
    })

    // Create OrderItem entries
    const OrderItem = app.models.OrderItem;
    
    const orderItems = [{
        "orderId": 1,
        "menuItemId": 1,
        "quantity": 1,
        "price": 5.9
    }, {
        "orderId": 1,
        "menuItemId": 2,
        "quantity": 1,
        "price": 2
    }, {
        "orderId": 2,
        "menuItemId": 2,
        "quantity": 2,
        "price": 4
    }]

    OrderItem.create(orderItems, (err, orderItem) => {
        if (err) {
            console.error("Error creating OrderItem:", err);
        } else {
            console.log("OrderItem created:", orderItem);
        }
    })

    // Create Customer entries
    const Customer = app.models.Customer;

    const customers = [{
        "name": "Bob",
        "username": "Bob12",
        "password": "Bob12"
    }]

    Customer.create(customers, (err, customer) => {
        if (err) {
            console.error("Error creating Customer:", err);
        } else {
            console.log("Customer created:", customer);
        }
    })

    // Create Order entries
    const Order = app.models.Order;

    const orders = [{
        "customerId": 1,
        "date": "2022-04-25",
        "price": 7.9
    }, {
        "customerId": 1,
        "date": "2022-04-22",
        "price": 4
    }]

    Order.create(orders, (err, order) => {
        if (err) {
            console.error("Error creating Order:", err);
        } else {
            console.log("Order created:", order);
        }
    })
};