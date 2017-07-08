import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TwitterService {

  constructor(private http: Http) { }

  get(path, params = {}) {
    const url = 'http://localhost:3001/' + path;

    return this.http.get(url, { params: params})
     .map( res => JSON.parse(res.json()));
  }
}
