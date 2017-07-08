import { Injectable } from '@angular/core';
import { TwitterService } from '../twitter/twitter.service';
import { Subject } from 'rxjs/Subject';
import { IUser } from './user';
import { Observable } from 'rxjs';
import _ from 'lodash';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  // Observable string sources
  private usersSource = new Subject<any>();

  // Observable string streams.
  userStream = this.usersSource.asObservable();

  constructor(private twitter: TwitterService) { }

  /**
   * Get users with an optional filter.
   *
   * @param {String} filter - String to filter the users by.
   * @param {Integer} limit - Limit to how many users to fetch.
   *
   * @return {Observable}
   * Returns an Observable of users request.
   */
  getUsers(filter: string, limit: number) : Observable<IUser[]> {
    const
      path = 'users/search.json',
      params = _.pickBy({ q: filter , count: limit }, e => e);

    // no sense to send get user request without query.
    return params.q ? this.twitter.get(path, params) : Observable.of([]);
  }

  /**
   * Push a new users array up the usersStream.
   *
   * @param {IUser[]} newUsers - A new users array to push into the stream.
   */
  streamUsers(newUsers: IUser[]) {
    this.usersSource.next(newUsers);
  }
}
