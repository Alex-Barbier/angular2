import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';

import {AppModel} from '../providers/appModel';

@Component({
  selector: 'dates',
  directives: [ ...FORM_DIRECTIVES, NgFor ],
  providers: [ ],
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
     
  constructor(private app:AppModel) {
      this.dates = {
          byHour: [],
          byDay: [],
          byMonth: []
      };
      
      Object.keys(app.rankedMatchesList.matchesByHour)
        .forEach(hour => {
          this.dates.byHour.push({
            hour: hour,
            timesPlayed: app.rankedMatchesList.matchesByHour[hour]
          }); 
      });
      
      Object.keys(app.rankedMatchesList.matchesByDay)
        .forEach(day => {
          this.dates.byDay.push({
            day: day,
            timesPlayed: app.rankedMatchesList.matchesByDay[day]
          }); 
      });
      
      Object.keys(app.rankedMatchesList.matchesByMonth)
        .forEach(month => {
          this.dates.byMonth.push({
            month: month,
            timesPlayed: app.rankedMatchesList.matchesByMonth[month]
          }); 
      });
  }
  
  ngOnInit() {
    console.log('hello dates');
  }

}
