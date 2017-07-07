import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  template:`
  <md-toolbar color="primary">
    <md-nav-list color="primary">
      <a href="#" md-list-item *ngFor="let menu of menuList"> {{ menu }}</a>
    </md-nav-list>
  </md-toolbar>
  `,
  styleUrls: [`./nav-bar.component.scss`]
})
export class NavBarComponent {

  menuList = [
    'About',
    'Home',
    'Contact',
  ];

}
