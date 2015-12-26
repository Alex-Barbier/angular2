import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';

import {AppModel} from '../providers/appModel';
import {MatchListService} from '../providers/matchListService';
import { RouterLink, RouteParams } from 'angular2/router';

const d3 = require('d3');

@Component({
  selector: 'champions',
  directives: [ ...FORM_DIRECTIVES, NgFor ],
  providers: [ MatchListService ],
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

  routeParam: RouteParams;
  constructor(private app:AppModel, public matchListService:MatchListService, routeParam: RouteParams) {
    this.routeParam = routeParam;
    this.app.summonerName = routeParam.params.summoner;

    if (!Object.keys(this.app.rankedMatchesList.matchesByChamp).length) {
        this.matchListService
          .loadMatches()
          .subscribe(res => {
            this.app.rankedMatchesList = res
            this.loadChampions();
            this.drawChart();
          });
    }
    else {
      this.loadChampions();
      this.drawChart();
    }
  }

  loadChampions() {
    this.champions = [];
    Object.keys(this.app.rankedMatchesList.matchesByChamp)
      .forEach(championName => {
        this.champions.push({
          championName: championName,
          timesPlayed: this.app.rankedMatchesList.matchesByChamp[championName]
        });
    });

    this.champions.sort((a, b) => {
      return a.timesPlayed - b.timesPlayed;
    });
    this.champions.reverse();
  }

  drawChart() {
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
          .text(function() { return `${c.championName} - ${c.timesPlayed}`;});

      div.insert("div")
          .attr("class", "blue-bar")
          .style("width", function() {
            return x(c.timesPlayed) + "%";
          });
    });
  }

  ngOnInit() {
    console.log('hello champions');
  }

}
