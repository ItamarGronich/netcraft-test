import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent  {

  usersObservable : Observable<IUser[]>;

  constructor(private userService : UserService) {

    this.usersObservable = this.userService.userStream;
  }


}
