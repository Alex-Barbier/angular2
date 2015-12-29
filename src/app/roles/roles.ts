import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';

import {AppModel} from '../providers/appModel';
import {MatchListService} from '../providers/matchListService';
import {ChartService} from '../providers/chartService';
import {FormatFieldService} from '../providers/formatField';
import { RouterLink, RouteParams } from 'angular2/router';

@Component({
  selector: 'roles',
  directives: [ ...FORM_DIRECTIVES, NgFor ],
  providers: [ MatchListService, ChartService, FormatFieldService ],
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

    if (!Object.keys(this.app.rankedMatchesList.matchesByRole).length) {
        this.matchListService
          .loadMatches()
          .subscribe(res => {
            this.app.rankedMatchesList = res;
            this.roles = formatFieldService.formatField(this.app.rankedMatchesList.matchesByRole); 
            chartService.drawChart('.chart', this.roles);
          });
    } 
    else {
      this.roles = formatFieldService.formatField(this.app.rankedMatchesList.matchesByRole);
      chartService.drawChart('.chart', this.roles);
    }
  }
};
