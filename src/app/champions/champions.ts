import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';

import {AppModel} from '../providers/appModel';

import * as d3 from 'd3';

@Component({
  selector: 'champions',
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
      
      var data = [4, 8, 15, 16, 23, 42];
      
      d3.select(".chart")
        .selectAll("div")
            .data(data)
        .enter().append("div")
            .attr("class", "blue-bar")
            .style("width", function(d) { return d * 10 + "px"; })
            .text(function(d) { return d; });
  }
  
  ngOnInit() {
    console.log('hello champions');
  }

}
