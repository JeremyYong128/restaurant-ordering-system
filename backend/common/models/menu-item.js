'use strict';

module.exports = function(MenuItem) {
    // Returns an object containing each MenuItem.
    MenuItem.menuItems = function(cb) {
        MenuItem.find({}, function(err, menuItems) {
            if (err || !menuItems) {
                cb(err || new Error("MenuItems not found"));
            } else {
                cb(null, menuItems);
            }
        });
    };

    MenuItem.remoteMethod("menuItems", {
        http: {
            path: "/menuItems",
            verb: "get"
        },
        returns: {
            arg: "menuItems",
            type: "array",
            root: true
        }
    });
};
