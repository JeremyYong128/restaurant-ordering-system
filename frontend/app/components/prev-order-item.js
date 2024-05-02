import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class OrderFormComponent extends Component {

    @tracked
    dateFormatted = new Date(this.args.item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    @action
    submitForm(event) {
        event.preventDefault();
        
        var message = document.createElement("p")
        message.innerHTML = "Your order has been submitted!"
        document.querySelector("form").appendChild(message);
    }
}
