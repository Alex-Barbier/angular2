import {Injectable} from 'angular2/core';

import {Http} from 'angular2/http';
import {AppModel} from '../providers/appModel';

@Injectable()
export class MatchListService {
  rankedMatchesList: Array<any>;
  constructor(public http: Http, public app: AppModel) {
    this.http = http;
    // this.title = title;
    this.rankedMatchesList = [{
      championName: 'waitforit'
    }];
  }
  
  loadMatches() {
    this.http.get(`http://localhost:4000/login/Elwanna`)
    // this.http.get(`http://localhost:4000/login/${this.title.value}`)
      // Call map on the response observable to get the parsed people object
      .map(res => res.json()) 
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(matchList => this.setRankedMatchesList(matchList));
  }
  
  setRankedMatchesList(rankedMatchesList) {
      this.app.rankedMatchesList = rankedMatchesList;
  }
}
