import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user/user.service';
import { TweetService } from '../tweet/tweet.service';
import { Observable } from 'rxjs';
import { IUser } from '../user/user';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/concatAll';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  usersFormCtrl: FormControl;
  filteredUsers: any;
  currentUsers: IUser[];
  currentSearchQuery: string;

  constructor(private userService: UserService, private tweetService: TweetService) {
    this.usersFormCtrl = new FormControl();

    // Subscribe to valueChanges {Observable} and get filtered users from api
    // on each typing. Throttled to 250.
    this.filteredUsers = this.usersFormCtrl.valueChanges
        .startWith(null)
        .debounceTime(250) // Throttle user input.
        .map(name => {
          this.currentSearchQuery = name;
          return this.filterUsers(name);
        }) // Get filtered users {Observable}.
        .concatAll() // filterUsers returns an Observable.
        .map( users => {
          this.currentUsers = users; // Store all 20.
          return users.slice(0,10);// limit to 10 in autocomplete.
        })

  }

  /**
   * Makes a get request with an optional filter
   *
   * @param {String} filter - Filter query.
   */
  filterUsers(filter: string) : Observable<IUser[]> {
    // Fire get request. Returns an Observable.
    return this.userService.getUsers(filter, 20);
  }

  streamContent(users: IUser[]) {
    this.userService.streamUsers(users);
    this.tweetService.getTweets({q: this.currentSearchQuery, count: 50})
      .subscribe(data => this.tweetService.streamTweets(data));
  }

  ngOnInit() {
  }

}
