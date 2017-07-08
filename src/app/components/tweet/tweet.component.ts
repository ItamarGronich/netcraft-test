import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  media: any;

  @Input() tweet: any;

  constructor() { }

  ngOnInit() {
    let media = this.tweet.entities.media;

    this.media = media ?
      media
        .filter(mediaItem => mediaItem.type === 'photo')
        .map( mediaItem => mediaItem.media_url)
      : null;
  }

}
