'use strict';

module.exports = function(Order) {
    // Returns an object containing full details of an Order.
    Order.orderDetails = function(orderId, cb) {
        const OrderItem = Order.app.models.OrderItem;

        Order.findById(orderId, { include: "orderItems" }, function(err, order) {
            if (err || !order) {
                cb(err || new Error("Order not found"));
            } else {
                let promises = [];
                order.toJSON().orderItems.forEach(orderItem => {
                    promises.push(new Promise((resolve, reject) => {
                        OrderItem.orderItemDetails(orderItem.id.toString(), function(err, orderItemDetails) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(orderItemDetails);
                            }
                        });
                    }));
                });

                Promise.all(promises)
                    .then(orderItemsDetails => {
                        const processedOrder = Object.assign({}, order.toJSON());
                        processedOrder.orderItems = orderItemsDetails;
                        cb(null, processedOrder);
                    })
                    .catch(err => {
                        cb(err);
                    });
            }
        });
    };

    Order.remoteMethod("orderDetails", {
        http: {
            path: "/orderDetails",
            verb: "get"
        },
        accepts: {
            arg: "orderId",
            type: "string",
            http: { source: "query" }
        },
        returns: {
            arg: "orderDetails",
            type: "object",
            root: true
        }
    });

    // Creates an Order.
    Order.createOrder = function(customerId, itemList, cb) {
        const OrderItem = Order.app.models.OrderItem;
        
        Order.create({
            date: new Date(),
            price: -1,
            customerId: customerId
        }, (err, order) => {
            if (err) {
                console.log("Error creating Order:", err);
            } else {
                let totalPrice = 0;
                itemList.forEach(item => {
                    totalPrice += parseFloat((item.quantity * item.price).toFixed(2));
                    OrderItem.createOrderItem(order.id, item.id, item.quantity, item.price);
                });

                order.updateAttribute("price", totalPrice, (err, order) => {
                    if (err) {
                        console.log("Error updating Order price:", err);
                    } else {
                        console.log("Order created:", order);
                    }
                });
            }
        });

    }

    Order.remoteMethod("createOrder", {
        http: {
            path: "/createOrder",
            verb: "post"
        },
        accepts: [{
            arg: "customerId",
            type: "number",
            required: true,
            http: { source: "form" }
        }, {
            arg: "itemList",
            type: "array",
            required: true,
            http: { source: "form" }
        }]
    });
};