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

      var x = d3.scale.linear()
        .domain([0, d3.max(this.champions.map(c => c.timesPlayed))])
        .range([0, 100]);

      d3.select(".chart")
        .selectAll("div")
            .data(this.champions)
        .enter().append("span")
            .text(function(c) { return `${c.championName} - ${c.timesPlayed}`;)
        .append("div")
            .attr("class", "blue-bar")
            .style("width", function(c) {
              return x(c.timesPlayed) + "%";
            });
  }

  ngOnInit() {
    console.log('hello champions');
  }

}
