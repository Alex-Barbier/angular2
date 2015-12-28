import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';

import {AppModel} from '../providers/appModel';
import {ChartService} from '../providers/chartService';
import {MatchListService} from '../providers/matchListService';
import {FormatFieldService} from '../providers/formatField';
import { RouterLink, RouteParams } from 'angular2/router';

@Component({
  selector: 'dates',
  directives: [ ...FORM_DIRECTIVES, NgFor ],
  providers: [ MatchListService, ChartService, FormatFieldService ],
  pipes: [],
  styles: [],
  template: require('./dates.html')
})
export class Dates {
  // TypeScript public modifiers
  dates: {
    byHour: Array<{
        hour:string,
        timesPlayed:number
    }>,
    byDay: Array<{
        day:string,
        timesPlayed:number
    }>,
    byMonth: Array<{
        month:string,
        timesPlayed:number
    }>,
  }; 
     
  constructor(
    private app:AppModel,
    public matchListService:MatchListService,
    routeParam: RouteParams,
    public chartService:ChartService,
    public formatFieldService:FormatFieldService
  ) {
    this.dates = {
        byHour: [],
        byDay: [],
        byMonth: []
    };
      
    this.routeParam = routeParam; 
    this.app.summonerName = routeParam.params.summoner;

    if (!Object.keys(this.app.rankedMatchesList.matchesByHour).length) {
        this.matchListService
          .loadMatches()
          .subscribe(res => {
            this.app.rankedMatchesList = res;
            this.dates.byHour = formatFieldService.formatField(this.app.rankedMatchesList.matchesByHour); 
            chartService.drawChart('.chart-hour', this.dates.byHour);
            this.dates.byDay = formatFieldService.formatField(this.app.rankedMatchesList.matchesByDay); 
            chartService.drawChart('.chart-day', this.dates.byDay);
            this.dates.byMonth = formatFieldService.formatField(this.app.rankedMatchesList.matchesByMonth); 
            chartService.drawChart('.chart-month', this.dates.byMonth);
          });
    } 
    else {
        this.dates.byHour = formatFieldService.formatField(this.app.rankedMatchesList.matchesByHour); 
        chartService.drawChart('.chart-hour', this.dates.byHour);
        this.dates.byDay = formatFieldService.formatField(this.app.rankedMatchesList.matchesByDay); 
        chartService.drawChart('.chart-day', this.dates.byDay);
        this.dates.byMonth = formatFieldService.formatField(this.app.rankedMatchesList.matchesByMonth); 
        chartService.drawChart('.chart-month', this.dates.byMonth);
    }
  }
  
  ngOnInit() {
    console.log('hello dates');
  }

}
