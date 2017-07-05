import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../user/user';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/concatAll';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  usersFormCtrl: FormControl;
  filteredUsers: any;


  constructor(private userService: UserService) {
    this.usersFormCtrl = new FormControl();

    // Subscribe to valueChanges {Observable} and get filtered users from api
    // on each typing. Throttled to 250.
    this.filteredUsers = this.usersFormCtrl.valueChanges
        .startWith(null)
        .debounceTime(250) // Throttle user input.
        .map(name => this.filterUsers(name)) // Get filtered users {Observable}.
        .concatAll() // filterUsers returns an Observable.
  }

  /**
   * Makes a get request with an optional filter
   *
   * @param {String} filter - Filter query.
   */
  filterUsers(filter: string) : Observable<IUser[]> {
    // Fire get request. Returns an Observable.
    return this.userService.getUsers(filter);
  }
}
