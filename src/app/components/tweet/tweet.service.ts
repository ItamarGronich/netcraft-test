import { Injectable } from '@angular/core';
import { TwitterService } from '../twitter/twitter.service';
import { Subject } from 'rxjs/Subject';
import { ITweet } from './tweet';
import { Observable } from 'rxjs/Observable';
import _ from 'lodash';

import 'rxjs/add/operator/map';

@Injectable()
export class TweetService {
  // Observable string sources
  private tweetsSource = new Subject<any>();

  // Observable string streams.
  tweetStream = this.tweetsSource.asObservable();
  max_id : number;

  constructor(private twitter: TwitterService) { }

  /**
   * Get tweets with an optional filter.
   *
   * @param {String} filter - String to filter the tweets by.
   * @param {Integer} limit - Limit to how many tweets to fetch.
   *
   * @return {Observable}
   * Returns an Observable of tweets request.
   */
  getTweets(filter: string, limit: number) : Observable<ITweet[]> {
    const
      path = 'search/tweets.json',
      params = _.pickBy({ q: filter , count: limit, max_id: this.max_id}, e => e);

    return this.twitter.get(path, params);
  }

  /**
   * Push a new tweets array up the tweetsStream.
   *
   * @param {Itweet[]} newtweets - A new tweets array to push into the stream.
   */
  streamTweets(newTweets: any) {
    const lastTweet = newTweets.statuses.slice(-1).pop();
    this.max_id = lastTweet ? lastTweet.id_str : null;
    this.tweetsSource.next(newTweets.statuses);
  }
}
