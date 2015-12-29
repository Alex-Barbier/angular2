import {Injectable} from 'angular2/core';

import {Http} from 'angular2/http';
import {AppModel} from '../providers/appModel';

@Injectable()
export class MatchListService {
  constructor(public http: Http, public app: AppModel) {
    this.http = http;
  }

  loadMatches() {
    return this.http.get(`http://localhost:4000/login/${this.app.summonerName}?region=${this.app.region}`)
      // Call map on the response observable to get the parsed people object
      .map(res => res.json());
  }
}
