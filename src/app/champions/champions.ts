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

      this.champions.sort((a, b) => {
        return a.timesPlayed - b.timesPlayed;
      });
      this.champions.reverse();

      var x = d3.scale.linear()
        .domain([0, d3.max(this.champions.map(c => c.timesPlayed))])
        .range([0, 50]);

      d3.select(".chart").html("");

      this.champions.forEach(function(c){
        var chart = d3.select(".chart");
        var div = chart.append("div")
                       .attr("class", "chart-holder");
        div.append("span")
            .attr("class", "float-left")
            .text(function() { return `${c.championName} - ${c.timesPlayed}`;);
        div.insert("div")
            .attr("class", "blue-bar")
            .style("width", function() {
              return x(c.timesPlayed) + "rem";
            });
      });

      // d3.select(".chart")
      //   .selectAll("div")
      //       .data(this.champions)
      //   .enter().append("span")
      //       .text(function(c) { return `${c.championName} - ${c.timesPlayed}`;);
      // .insert("div")
      //     .attr("class", "blue-bar")
      //     .style("width", function(c) {
      //       return x(c.timesPlayed) + "%";
      //     });
  }

  ngOnInit() {
    console.log('hello champions');
  }

}
