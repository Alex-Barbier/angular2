import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';

import {AppModel} from '../providers/appModel';

@Component({
  selector: 'champion',
  directives: [ ...FORM_DIRECTIVES, NgFor ],
  providers: [ ],
  pipes: [],
  styles: [ require('./champions.css') ],
  template: require('./champions.html')
})
export class Champions {
  // TypeScript public modifiers
  champions: Array<{
        championName:string,
        timesPlayed: number
    }>; 
    
  constructor(private app:AppModel) {
      this.champions = [];
      Object.keys(app.rankedMatchesList.matchesByChamp)
        .forEach(championName => {
          this.champions.push({
            championName: championName,
            timesPlayed: app.rankedMatchesList.matchesByChamp[championName]
          }); 
      });
  }
  
  ngOnInit() {
    console.log('hello champions');
  }

}
