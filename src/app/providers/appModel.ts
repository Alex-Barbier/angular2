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
    this.summonerName = 'Elwanna';
        this.rankedMatchesList = {
      matchesByChamp: {
      },
      championName: 'waitforit',
      matchesNumber: 0
    };
  }
  
  changeSummonerName(summonerName){
      this.summonerName = summonerName;
  }
};