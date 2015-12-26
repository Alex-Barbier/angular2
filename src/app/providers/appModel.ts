export class AppModel {
  summonerName: string;
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
};
