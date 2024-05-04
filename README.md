# Restaurant Ordering System

Welcome to the Restaurant Ordering System! This project is a full-stack web application that allows users to interact with a restaurant's menu, place orders, and view customer accounts. It's built using Ember.js for the frontend and IBM Loopback 3 for the backend API.

## Setup Instructions

To set up the development environment for the Restaurant Ordering System, follow these steps:

1. Clone the repository using `git clone https://github.com/JeremyYong128/restaurant-ordering-system.git`.
2. Navigate into the project directory with `cd restaurant-ordering-system`.
3. Set up and deploy backend:
```
cd backend
npm install
node .
```
4. Set up and deploy frontend:
```
cd frontend
npm install
ember serve
```
5. You can now access the web application at [http://localhost:4200/](http://localhost:4200/).

## Using the Application
As the application is not linked to a persistent database (see [Areas for Improvement](#areas-for-improvement)), I have used the boot script to initialise some sample data when the application is started. To view this, you can login with username and password "Bob12". Alternatively, you can create an account as well.

## Models and Relations

This application consists of four main models: Customer, MenuItem, Order, and OrderItem.

### 1. Customer: represents a customer's profile.


**Properties:**
- id: Primary key.
- name: Name of the customer.
- username: Username for login.
- password: Password for login.

**Relations:**
- Orders (hasMany): each customer can make multiple orders.

### 2. MenuItem: represents an item on the menu.


**Properties:**
- id: Primary key.
- name: Name of the item.
- price: Price of the item.

### 3. Order: represents an order made by a customer.


**Properties:**
- id: Primary key.
- date: The date the order was made.
- price: Total price of the order.

**Relations:**
- OrderItems (hasMany): each order consists of one or multiple order items.

### 4. OrderItem:


**Properties:**
- id: Primary key.
- quantity: The quantity of the particular item that the customer ordered.
- price: The total price of this order item.

**Relations:**
- Order (belongsTo): each order item is associated with one order.
- MenuItem (belongsTo): each order represents an order of one menu item.

## API Documentation

This section documents the API endpoints provided for interacting with the Loopback models.

### 1. Customer

`GET /api/customerDetails?customerId={id}`
- Description: Retrieve details of a customer by ID. Includes details of previous orders.
- Parameters:
    - id: The unique id of the customer.
- Sample request:
```
/api/customers/customerDetails?customerId=1
```

- Sample response:

```
{
    "name": "Bob",
    "username": "Bob12",
    "password": "Bob12",
    "id": 1,
    "orders": [
        {
            "date": "2022-04-25T00:00:00.000Z",
            "price": 7.9,
            "id": 1,
            "customerId": 1,
            "orderItems": [
                {
                    "quantity": 1,
                    "price": 2,
                    "id": 2,
                    "orderId": 1,
                    "menuItemId": 2,
                    "menuItem": {
                        "name": "Ice Cream",
                        "price": 2,
                        "id": 2
                    }
                }
            ]
        }  
    ]
}
```

`GET /api/login?username={username}&password={password}`
- Description: Retrieve details of a customer by login details. Does not include previous orders. Returns an empty object if the customer does not exist.
- Parameters:
    - username: The username of the customer.
    - password: The password of the customer.
- Sample request:
```
/api/customers/login?username=Bob12&password=Bob12
```

- Sample response:

```
{
    "name": "Bob",
    "username": "Bob12",
    "password": "Bob12",
    "id": 1
}
```

### 2. MenuItem

`GET /api/menuItems/menuItems`
- Description: Retrieve a list of all menu items.
- Sample request:
```
/api/menuItems/menuItems
```

- Sample response:

```
[
    {
        "name": "Curry Chicken",
        "price": 5.9,
        "id": 1
    }, {
        "name": "Ice Cream",
        "price": 2,
        "id": 2
    }
]
```

### 3. Order

`GET /api/orders/orderDetails?orderId={id}`
- Description: Retrieve details of an order by ID.
- Parameters:
    - id: The ID of the order to query.
- Sample request:
```
/api/orders/orderDetails?orderId=1
```

- Sample response:

```
{
    "date": "2022-04-25T00:00:00.000Z",
    "price": 7.9,
    "id": 1,
    "customerId": 1,
    "orderItems": [
        {
            "quantity": 1,
            "price": 5.9,
            "id": 1,
            "orderId": 1,
            "menuItemId": 1,
            "menuItem": {
                "name": "Curry Chicken",
                "price": 5.9,
                "id": 1
            }
        }, {
            "quantity": 1,
            "price": 2,
            "id": 2,
            "orderId": 1,
            "menuItemId": 2,
            "menuItem": {
                "name": "Ice Cream",
                "price": 2,
                "id": 2
            }
        }
    ]
}
```

`POST /api/orders/createOrder`
- Description: Create an order belonging to a customer based on the list of items provided.
- Request body:
    - Format: JSON
    - Fields:
        - customerID: The ID of the customer who made this order.
        - itemList: An array of order items.
- Sample request body:
```
{
    customerId: 1,
    itemList: [
        {
            "name": "Curry Chicken",
            "price": 5.9,
            "id": 1,
            "quantity": "2"
        }
    ]
}
```

### 4. OrderItem

`GET /api/orderItems/orderItemDetails?orderItemId={id}`
- Description: Retrieve details of an order item by ID.
- Parameters:
    - id: The ID of the order item to query.
- Sample request:
```
/api/orderItems/orderItemDetails?orderItemId=1
```

- Sample response:

```
{
    "quantity": 1,
    "price": 5.9,
    "id": 1,
    "orderId": 1,
    "menuItemId": 1,
    "menuItem": {
        "name": "Curry Chicken",
        "price": 5.9,
        "id": 1
    }
}
```

`POST /api/orderItems/createOrderItem?orderId={orderId}&menuItemId={menuItemId}&quantity={quantity}&price={price}`
- Description: Create an order item belonging to an order.
- Parameters:
    - orderId: The ID of the order.
    - menuItemId: The ID of the menu item.
    - quantity: The number of that menu item being ordered.
    - price: The total price of this order item.
- Sample request:
```
/api/orderItems/createOrderItem?orderId=1&menuItemId=1&quantity=1&price=5.9
```

## Areas for Improvement
The following describes some limitations of the application and suggest future improvements that could be made.

1. Database: The application currently does not support persisted data due to difficulties with connecting the backend with a PostgreSQL database. This meant that the data is reset whenever the backend server is restarted.

2. Frontend: The frontend design is minimal as my main focus was to implement the backend models and API functionality. The design could be improved to make the website more user-friendly.

3. More functionality: Although the backend has been set up, it currently supports a very limited range of operations (creating and viewing orders). The following are some features that could be added:
- Providing the full range of CRUD operations: allowing customers to update and delete their orders.
- Admin operations: allow an admin account to create, read, update and delete menu items and view all customer orders.

4. Testing: Adding tests to both the frontend and backend ensures that the system continues to work as expected as the application continues to develop.

5. Deployment over the internet: Deploying the application over the internet allows users to interact with a shared instance of the application, allowing it to function more like a real world application.