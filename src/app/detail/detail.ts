import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';
import {Http} from 'angular2/http';

import {AppModel} from '../providers/appModel';
import {MatchListService} from '../providers/matchListService';

@Component({
  selector: 'detail',
  directives: [ ...FORM_DIRECTIVES, NgFor ],
  providers: [ MatchListService ],
  pipes: [],
  styles: [ require('./detail.css') ],
  template: require('./detail.html')
})
export class Detail {
  // TypeScript public modifiers
  constructor(private app:AppModel) {
  }
  
  ngOnInit() {
    console.log('hello detail');
  }

}
