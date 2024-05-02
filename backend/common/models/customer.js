'use strict';

module.exports = function(Customer) {
    // Returns an object containing full details of a Customer.
    Customer.customerDetails = function(customerId, cb) {
        const Order = Customer.app.models.Order;

        Customer.findById(customerId, { include: "orders" }, function(err, customer) {
            if (err || !customer) {
                cb(err || new Error("Customer not found"));
            } else {
                let promises = [];
                customer.toJSON().orders.forEach(order => {
                    promises.push(new Promise((resolve, reject) => {
                        Order.orderDetails(order.id.toString(), function(err, orderDetails) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(orderDetails);
                            }
                        });
                    }));
                });

                Promise.all(promises)
                    .then(orderDetails => {
                        const processedCustomer = Object.assign({}, customer.toJSON());
                        processedCustomer.orders = orderDetails;
                        cb(null, processedCustomer);
                    })
                    .catch(err => {
                        cb(err);
                    });
            }
        });
    };

    Customer.remoteMethod("customerDetails", {
        http: {
            path: "/customerDetails",
            verb: "get"
        },
        accepts: {
            arg: "customerId",
            type: "string",
            http: { source: "query" }
        },
        returns: {
            arg: "customerDetails",
            type: "object",
            root: true
        }
    });

    // Returns the Customer with the given username and password.
    Customer.login = function(username, password, cb) {
        Customer.findOne({ where: { username: username, password: password } }, function(err, customer) {
            if (err || !customer) {
                cb(err || null);
            } else {
                cb(null, customer);
            }
        });
    };

    Customer.remoteMethod("login", {
        http: {
            path: "/login",
            verb: "get"
        },
        accepts: [
            {
                arg: "username",
                type: "string",
                required: true,
                http: { source: "query" }
            },
            {
                arg: "password",
                type: "string",
                required: true,
                http: { source: "query" }
            }
        ],
        returns: {
            arg: "customer",
            type: "object",
            root: true
        }
    });
};
