import { Injectable } from '@angular/core';
import { TwitterService } from '../twitter/twitter.service';
import { Subject } from 'rxjs/Subject';
import { ITweet } from './tweet';
import { Observable } from 'rxjs';
import _ from 'lodash';

@Injectable()
export class TweetService {
  // Observable string sources
  private tweetsSource = new Subject<any>();

  // Observable string streams.
  tweetStream = this.tweetsSource.asObservable();
  nextResults: any;
  PATH: object;
  userId: number;

  constructor(private twitter: TwitterService) {
    this.nextResults = {
      fn: () => null,
      query: ''
    }
  }

  static get PATH() {
    return {
      SEARCH_TWEETS: 'search/tweets.json',
      USER_TWEETS: 'statuses/user_timeline.json'
    }
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
  getTweets(paramsObj): Observable<ITweet[]> {

    const params = _.pickBy(paramsObj, e => e);
    this.nextResults.fn = this.getTweets;
    return this.twitter.get(TweetService.PATH.SEARCH_TWEETS, params);
  }

  getUserTweets(params) {
    if (params.user_id) {
      this.userId = params.user_id;
      this.nextResults.fn = this.getUserTweets;
      return this.twitter.get(TweetService.PATH.USER_TWEETS, params);
    } else if (this.userId) {
      params.user_id = this.userId;
      this.nextResults.fn = this.getUserTweets;
      return this.twitter.get(TweetService.PATH.USER_TWEETS, params);
    } else {
      return Observable.of([]);
    }
  }

  /**
   * Push a new tweets array up the tweetsStream.
   *
   * @param {Itweet[]} newtweets - A new tweets array to push into the stream.
   */
  streamTweets(newTweets: any) {
    if (newTweets.search_metadata) {
      this.nextResults.query = newTweets.search_metadata.next_results;
      this.tweetsSource.next(newTweets.statuses);
    } else {
      const genNewTweets = {
        'statuses' : newTweets,
        'search_metadata' : {
          next_results : `?max_id=${newTweets.slice(-1).pop().id_str}`
        }
      };

      this.streamTweets(genNewTweets);
    }
  }

  getNextResults() {
    const { fn, query } = this.nextResults;

    const params = {};
    query.slice(1).split('&').forEach(q => { q = q.split('='); return params[q[0]] = q[1] });
    return fn.call(this, params);
  }
}
