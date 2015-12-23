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
  summonerName: string;
  constructor(private app:AppModel, public matchListService:MatchListService){
      this.summonerName = app.summonerName;
  }

  changeSummonerName() {
    this.app.changeSummonerName(this.summonerName);
  }
  
  ngOnInit() {
    console.log('hello Home');
  }

}
