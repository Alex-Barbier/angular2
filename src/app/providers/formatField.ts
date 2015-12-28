import {Injectable} from 'angular2/core';

@Injectable()
export class FormatFieldService {
  constructor() {
  }
  
  //formats a data from object with key (name) : value (timesPlayed) into array of objects with params name & timesPlayed
  formatField(dataObject) {
    var dataArray = [];
    Object.keys(dataObject)
      .forEach(name => {
        dataArray.push({
          name,
          timesPlayed: dataObject[name]
        });
    });

    dataArray.sort((a, b) => {
      return a.timesPlayed - b.timesPlayed;
    });
    dataArray.reverse();
    
    return dataArray;
  }
};