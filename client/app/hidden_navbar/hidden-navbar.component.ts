
import {Component} from '@angular/core';

@Component({
    selector: 'hiddenbar',
    templateUrl: 'app/hidden_navbar/hidden-navbar.component.html',
    styleUrls: ['app/hidden_navbar/hidden-navbar.component.css'],
})

export class HiddenNavbarComponent {
    public viewable = true;

    changeViewable() {
        this.viewable = !this.viewable;
    }
}

