import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';

import {AppModel} from '../providers/appModel';
import {ChartService} from '../providers/chartService';
import {FormatFieldService} from '../providers/formatField';
import {MatchListService} from '../providers/matchListService';
import { RouterLink, RouteParams } from 'angular2/router';

@Component({
  selector: 'champions', 
  directives: [ ...FORM_DIRECTIVES, NgFor ],
  providers: [ MatchListService, ChartService, FormatFieldService ],
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
  constructor(
    private app:AppModel,
    public matchListService:MatchListService,
    routeParam: RouteParams,
    public chartService:ChartService,
    public formatFieldService:FormatFieldService
  ) {
    this.routeParam = routeParam;
    this.app.summonerName = routeParam.params.summoner;
    this.app.region = routeParam.params.region;

    if (!Object.keys(this.app.rankedMatchesList.matchesByChamp).length) {
        this.matchListService
          .loadMatches()
          .subscribe(res => {
            this.app.rankedMatchesList = res;
            this.champions = formatFieldService.formatField(this.app.rankedMatchesList.matchesByChamp); 
            chartService.drawChart('.chart', this.champions);
          });
    } 
    else {
      this.champions = formatFieldService.formatField(this.app.rankedMatchesList.matchesByChamp);
      chartService.drawChart('.chart', this.champions);
    }
  }
};
