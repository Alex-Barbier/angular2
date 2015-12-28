import {Injectable} from 'angular2/core';

const d3 = require('d3');

@Injectable()
export class ChartService {
  constructor() {
  }

  drawChart(selector, chartData) {
    console.log('chartService');
    var x = d3.scale.linear()
      .domain([0, d3.max(chartData.map(c => c.timesPlayed))])
      .range([0, 50]);

    d3.select(selector).html("");

    chartData.forEach(function(c){
      var chart = d3.select(selector);
      var div = chart.append("div")
                     .attr("class", "chart-holder");
      div.append("span")
          .attr("class", "float-left")
          .text(function() { return `${c.name} - ${c.timesPlayed}`;});

      div.insert("div")
          .attr("class", "blue-bar")
          .style("width", function() {
            return x(c.timesPlayed) + "%";
          });
    });
  }
}
