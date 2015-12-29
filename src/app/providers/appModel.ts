export class AppModel {
  summonerName: string;
  region
  rankedMatchesList:{
    matchesByChamp:{},
    matchesByDay:{},
    matchesByMonth:{},
    matchesByHour:{},
    matchesByRole:{},
    championName:string,
    matchesNumber:number
  };
  constructor() {
    this.summonerName = '';
    this.region = 'euw';
    this.rankedMatchesList = {
      matchesByChamp: {},
      matchesByDay:{},
      matchesByMonth:{},
      matchesByHour:{},
      matchesByRole:{},
      championName: 'waitforit',
      matchesNumber: 0
    };
  }

  changeSummonerName(summonerName){
      this.summonerName = summonerName;
  }
  
  setRegion(region){
      this.region = region;
  }
};
