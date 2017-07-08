import { Component, Input, OnInit } from '@angular/core';
import { IUser } from './user';
import { TweetService } from '../tweet/tweet.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit  {

  @Input() user: IUser;

  constructor(private tweetService: TweetService) {
  }

  ngOnInit() {
  }

  getUserTweets() {
    this.tweetService.getUserTweets({user_id: this.user.id_str})
      .subscribe( userTweets => this.tweetService.streamTweets(userTweets));
  }

}
