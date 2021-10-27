class Player {
  //properties of players
  constructor() {
    this.name=null
    this.index=null
    this.positionX=0
    this.positionY=0
    this.rank = 0
    this.score = 0
    this.fuel = 100
  }
  //adds the players in the database
  addPlayer(){
    if(this.index===1){
      this.positionX=width/2-150
    }else{
      this.positionX=width/2+150
    }
    database.ref("players/player"+this.index).set({
      name:this.name,
      positionX:this.positionX,
      positionY:this.positionY,
      rank:this.rank,
      score:this.score
    })
  }
  //read the playerCount from the database
  getCount(){
    database.ref("playerCount").on("value",data=>{
      playerCount=data.val()
    })
  }
  //write the playerCount to the database
  updateCount(num){
    database.ref("/").update({
      playerCount:num
    })
  }
  getDistance(){
    database.ref("players/player"+this.index).on("value",data=>{
      var pos=data.val()
      this.positionX= pos.positionX
      this.positionY = pos.positionY
    })
  }
  //write the distance to the database
  updateDistance(){
    database.ref("players/player"+this.index).update({
      positionX:this.positionX,
      positionY:this.positionY,
      rank:this.rank,
      score:this.score
    })
  }
  //collects all the players information at a time
  static getPlayersInfo(){
    database.ref("players").on("value",data=>{
      players = data.val()
    })
  }

}
