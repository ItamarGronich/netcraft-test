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
  title = 'FED test';
}
