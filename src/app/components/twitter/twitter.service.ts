import { Injectable } from '@angular/core';
import { Http, Headers, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TwitterService {

  oAuth: string;

  constructor(private http: Http, private jsonp: Jsonp) { }

  get(path, params) {
    const url = 'http://localhost:3001/' + path;

    return this.http.get(url, { params: params})
     .map( res => JSON.parse(res.json()));
  }



}
