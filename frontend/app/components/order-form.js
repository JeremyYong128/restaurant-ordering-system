import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class OrderFormComponent extends Component {
  @service userLogin;

  // Function fetches the menu items from the backend.

  @tracked
  itemList = [];

  constructor() {
    super(...arguments);
    
    fetch(`http://localhost:3000/api/menuItems/menuItems`, {
      method: "GET"
    }).then(res => res.json()).then(data => {
      this.itemList = data.map(item => {
        return {
          ...item,
          quantity: 0
        };
      });
    });
  }

  @action
  submitForm(event) {
    event.preventDefault();

    console.log(this.itemList);

    if (!this.userLogin.loggedIn) {
      alert("You must be logged in to submit an order!");
      return;
    }

    fetch(`http://localhost:3000/api/Orders/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerId: this.userLogin.customer.id,
        itemList: this.itemList.filter(item => item.quantity > 0)
      })
    })

    if (!event.target.querySelector(".order-button").nextElementSibling){
      var message = document.createElement("p")
      message.innerHTML = "Your order has been submitted!"
      document.querySelector("form").appendChild(message);
  }
  }
}
