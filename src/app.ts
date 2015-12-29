/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';

import {AppModel} from './app/providers/appModel';
import {XLarge} from './app/directives/x-large';

import {Home} from './app/home/home';
import {Champions} from './app/champions/champions';
import {Roles} from './app/roles/roles';
import {Dates} from './app/dates/dates';

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app', // <app></app>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ...FORM_PROVIDERS, AppModel],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ...ROUTER_DIRECTIVES, XLarge ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./app.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/:region/:summoner/roles', component: Roles, name: 'Roles' },
  { path: '/:region/:summoner/champions', component: Champions, name: 'Champions' },
  { path: '/:region/:summoner/dates', component: Dates, name: 'Dates' }
])
export class App { 
  constructor(private app:AppModel) {
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
