import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';

import {AppModel} from '../providers/appModel';
import {MatchListService} from '../providers/matchListService';
import { RouterLink, RouteParams } from 'angular2/router';

const d3 = require('d3');

@Component({
  selector: 'roles',
  directives: [ ...FORM_DIRECTIVES, NgFor ],
  providers: [ MatchListService ],
  pipes: [],
  styles: [],
  template: require('./roles.html')
})

export class Roles {
  // TypeScript public modifiers
  roles: Array<{
      role:string,
      timesPlayed: number
  }>;
  routeParam: RouteParams;
  constructor(private app:AppModel, public matchListService:MatchListService, routeParam: RouteParams) {
    this.routeParam = routeParam; 
    this.app.summonerName = routeParam.params.summoner;

    if (!Object.keys(this.app.rankedMatchesList.matchesByRole).length) {
        this.matchListService
          .loadMatches()
          .subscribe(res => {
            this.app.rankedMatchesList = res
            this.loadRoles();
            this.drawChart();
          });
    }
    else { 
      this.loadRoles();
      this.drawChart();
    }
  }

  loadRoles() {
    console.log('loadRoles')
    this.roles = [];
    Object.keys(this.app.rankedMatchesList.matchesByRole)
      .forEach(role => {
        this.roles.push({
          role: role,
          timesPlayed: this.app.rankedMatchesList.matchesByRole[role]
        });
    });

    this.roles.sort((a, b) => {
      return a.timesPlayed - b.timesPlayed;
    });
    this.roles.reverse();
  }

  drawChart() {
    var x = d3.scale.linear()
      .domain([0, d3.max(this.roles.map(c => c.timesPlayed))])
      .range([0, 50]);

    d3.select(".chart").html("");

    this.roles.forEach(function(c){
      var chart = d3.select(".chart");
      var div = chart.append("div")
                     .attr("class", "chart-holder");
      div.append("span")
          .attr("class", "float-left")
          .text(function() { return `${c.role} - ${c.timesPlayed}`;});

      div.insert("div")
          .attr("class", "blue-bar")
          .style("width", function() {
            return x(c.timesPlayed) + "%";
          });
    });
  }

  ngOnInit() {
  }

}
