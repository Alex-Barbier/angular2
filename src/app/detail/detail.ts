import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';
import {Http} from 'angular2/http';

import {Title} from '../providers/title';
import {MatchList} from '../providers/matchlist';

@Component({
  selector: 'detail',
  directives: [ ...FORM_DIRECTIVES, NgFor ],
  providers: [ Title, MatchList ],
  pipes: [],
  styles: [ require('./detail.css') ],
  template: require('./detail.html')
})
export class Detail {
  // TypeScript public modifiers
  constructor(public title: Title, public http: Http, public matchList: MatchList) {
  }
  
  loadMatches() {
    this.http.get(`http://localhost:4000/login/${this.title.value}`)
      // Call map on the response observable to get the parsed people object
      .map(res => res.json()) 
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(matchList => this.matchList = matchList);
  }
  
  ngOnInit() {
    console.log('hello detail');
  }

}
