import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class MenuListComponent extends Component {
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
}
