import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class LoginPageComponent extends Component {
    @service userLogin;

    @action
    logout() {
        this.userLogin.logout();
    }
    
}
