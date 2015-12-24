export class AppModel {
  summonerName: string;
  rankedMatchesList: Array<any>;
  constructor() {
    this.summonerName = 'Elwanna';
    this.rankedMatchesList = [];
  }
  
  changeSummonerName(summonerName){
      this.summonerName = summonerName;
  }
};