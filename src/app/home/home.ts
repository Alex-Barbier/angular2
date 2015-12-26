import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {MatchListService} from '../providers/matchListService';
import {AppModel} from '../providers/appModel';

@Component({
  selector: 'home',
  directives: [ ...FORM_DIRECTIVES ],
  providers: [ MatchListService ],
  pipes: [ ],
  styles: [ require('./home.css') ],
  template: require('./home.html')
})
export class Home {
  constructor(private app:AppModel, public matchListService:MatchListService){
  }

  loadMatches() {
    this.matchListService
      .loadMatches()
      .subscribe(res => this.app.rankedMatchesList = res);
  }

  ngOnInit() {
    console.log('hello Home');
  }

}
