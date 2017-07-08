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
  nextResults : string;
  PATH: string;

  constructor(private twitter: TwitterService) { }

  static get PATH() {
    return 'search/tweets.json'
  }

  /**
   * Get tweets with an optional filter.
   *
   * @param {String} filter - String to filter the tweets by.
   * @param {Integer} limit - Limit to how many tweets to fetch.
   *
   * @return {Observable}
   * Returns an Observable of tweets request.
   */
  getTweets(filter: string, limit: number, maxId: string = null) : Observable<ITweet[]> {
    const params = _.pickBy({ q: filter , count: limit, maxId: maxId}, e => e);

    return this.twitter.get(TweetService.PATH, params);
  }

  /**
   * Push a new tweets array up the tweetsStream.
   *
   * @param {Itweet[]} newtweets - A new tweets array to push into the stream.
   */
  streamTweets(newTweets: any) {
    this.nextResults = newTweets.search_metadata.next_results;
    this.tweetsSource.next(newTweets.statuses);
  }

  getNextResults() {
    return this.twitter.get( (TweetService.PATH + this.nextResults) );
  }
}
