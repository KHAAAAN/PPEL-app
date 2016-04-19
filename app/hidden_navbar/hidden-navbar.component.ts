
import {NavbarComponent} from '../navbar/navbar.component';
import {Component} from 'angular2/core';

@Component({
    selector: 'hiddenbar',
    templateUrl: 'app/hidden_navbar/hidden-navbar.component.html',
    styleUrls: ['app/hidden_navbar/hidden-navbar.component.css'],

    directives: [NavbarComponent]
})

export class HiddenNavbarComponent {
    public viewable = true;

    changeViewable() {
        if (this.viewable == true) {
            this.viewable = false;
        }
        else
            this.viewable = true;
    }
}

