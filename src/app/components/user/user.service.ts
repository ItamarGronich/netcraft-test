import { Injectable } from '@angular/core';
import { USERS } from '../../../mock-data/users.mock';
import { IUser } from './user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor() {

  }

  /**
   * Get users with an optional filter.
   *
   * @param {string} filter - String to filter the users by.
   *
   * @return {Observable}
   * Returns an Observable of users like the HTTP would.
   */
  getUsers(filter: string) : Observable<IUser[]> {
    let data = USERS;

    if (filter) {
      data = data.filter(user => user.uName.includes(filter));
    }

    return Observable.of(data);
  }
}
