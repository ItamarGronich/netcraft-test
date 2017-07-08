import { Injectable } from '@angular/core';
import { TwitterService } from '../twitter/twitter.service';
import _  from 'lodash';

@Injectable()
export class UserService {

  constructor(private twitter: TwitterService) {

  }

  /**
   * Get users with an optional filter.
   *
   * @param {String} filter - String to filter the users by.
   * @param {Integer} limit - Limit to how many users to fetch.
   *
   * @return {Observable}
   * Returns an Observable of users request.
   */
  getUsers(filter: string, limit: number) {
    const
      path = 'users/search.json',
      params = _.pickBy({ q: filter , count: limit}, e => e);

    return this.twitter.get(path, params);
  }
}
