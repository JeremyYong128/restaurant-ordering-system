import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class UserLoginService extends Service {
    @tracked loggedIn = false;
    @tracked customer = null;
    @tracked previousOrders = [];
    
    // Sets the customer field if the credentials are valid. If not, customer field remains null.
    isValidCredentials(username, password) {
        return fetch(`http://localhost:3000/api/customers/login?username=${username}&password=${password}`, {
            method: "GET"
        })
            .then(res => res.json()).then(data => {
                if (Object.keys(data).length === 0) {
                    this.customer = null;
                } else {
                    this.customer = data;
                }
            });
    }
    
    // Gets the previous orders of a customer.
    getPreviousOrders() {
        console.log(this.loggedIn)
        if (this.loggedIn) {
            return fetch(`http://localhost:3000/api/customers/customerDetails?customerId=${this.customer.id}`, {
            method: "GET"
            })
            .then(res => res.json()).then(data => {
                console.log(data);
                this.previousOrders = data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
            });
        }
    }

    @action
    login(event) {
        event.preventDefault();
        const data = event.target.querySelectorAll("input")
        const username = data[0].value;
        const password = data[1].value;

        this.customerId = this.isValidCredentials(username, password).then(data => {
            this.loggedIn = true;
            this.getPreviousOrders(this.customer.id);
            if (!this.loggedIn) {
                alert("Invalid login details!");
            }
        })
    }

    @action
    createAccount(event) {
        event.preventDefault();
        const data = event.target.querySelectorAll("input");
        console.log(data);
        const name = data[0].value;
        const username = data[1].value;
        const password = data[2].value;

        fetch("http://localhost:3000/api/customers/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                username: username,
                password: password
            })
        })
            .then(res => res.json()).then(data => {
                if (data.id) {
                    this.customer = data;
                    this.loggedIn = true;
                    this.getPreviousOrders(this.customer.id);
                }
            });
    }

    @action
    logout() {
        this.loggedIn = false
        this.customerId = ""
        this.previousOrders = []
    }
}
