import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, NgFor} from 'angular2/common';

import {AppModel} from '../providers/appModel';

@Component({
  selector: 'roles',
  directives: [ ...FORM_DIRECTIVES, NgFor ],
  providers: [ ],
  pipes: [],
  styles: [],
  template: require('./roles.html')
})
export class Roles {
  // TypeScript public modifiers
  roles: Array<{
        roleName:string,
        timesPlayed: number
    }>; 
    
  constructor(private app:AppModel) {
      this.roles = [];
      Object.keys(app.rankedMatchesList.matchesByRole)
        .forEach(roleName => {
          this.roles.push({
            roleName: roleName,
            timesPlayed: app.rankedMatchesList.matchesByRole[roleName]
          }); 
      });
  }
  
  ngOnInit() {
    console.log('hello roles');
  }

}
