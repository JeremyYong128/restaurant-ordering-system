'use strict';

module.exports = function(OrderItem) {
    // Returns an object containing full details of an OrderItem.
    OrderItem.orderItemDetails = function(orderItemId, cb) {
        OrderItem.findById(orderItemId, { include: 'menuItem' } , function(err, orderItem) {
            if (err || !orderItem) {
                cb(err || new Error("Order item not found"));
            } else {
                cb(null, orderItem);
            }
        });
    };

    OrderItem.remoteMethod("orderItemDetails", {
        http: {
            path: "/orderItemDetails",
            verb: "get"
        },
        accepts: {
            arg: "orderItemId",
            type: "string",
            http: { source: "query" }
        },
        returns: {
            arg: "orderItemDetails",
            type: "object",
            root: true
        }
    });

    // Creates an OrderItem.
    OrderItem.createOrderItem = function(orderId, menuItemId, quantity, price, cb) {
        OrderItem.create({
            orderId: orderId,
            menuItemId: menuItemId,
            quantity: quantity,
            price: parseFloat((quantity * price).toFixed(2))
        }, (err, orderItem) => {
            if (err) {
                console.log("Error creating OrderItem:", err);
            } else {
                console.log("OrderItem created:", orderItem);
            }
        });
    }

    OrderItem.remoteMethod("createOrderItem", {
        http: {
            path: "/createOrderItem",
            verb: "post"
        },
        accepts: [{
            arg: "orderId",
            type: "number",
            required: true,
            http: { source: "query" }
        }, {
            arg: "menuItemId",
            type: "number",
            required: true,
            http: { source: "query" }
        }, {
            arg: "quantity",
            type: "number",
            required: true,
            http: { source: "query" }
        }, {
            arg: "price",
            type: "number",
            required: true,
            http: { source: "query" }
        }]
    });
};
