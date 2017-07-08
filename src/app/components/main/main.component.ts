import { Component, OnInit } from '@angular/core';
import { TweetService } from '../tweet/tweet.service';
import { ITweet } from '../tweet/tweet';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  tweetsObservable : Observable<ITweet[]>;
  nextResults : string;

  constructor(private tweetService: TweetService) {
    this.tweetsObservable = this.tweetService.tweetStream;

    this.tweetsObservable.subscribe( () => this.nextResults = this.tweetService.nextResults );
  }

  getNextResults() {
    this.tweetService.getNextResults().subscribe( res => this.tweetService.streamTweets(res));
  }

  ngOnInit() {
  }

}
