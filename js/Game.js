class Game {
  constructor() {
    this.leaderboard = createElement("h2")
    this.leader1 = createElement("h2")
    this.leader2 = createElement("h2")
  }

  getState(){
    database.ref("gameState").on("value",data=>{
      gameState=data.val()
    })
  }
  //write the gameState to the database
  updateState(num){
    database.ref("/").update({
     gameState:num
    })
  }
  

  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount()
    car1 = createSprite(width/2-150,height-100)
    car2 = createSprite(width/2+150,height-100)
    car1.addImage(car1Img)
    car2.addImage(car2Img)
    car1.scale = 0.07
    car2.scale = 0.07
    cars = [car1,car2]
    fuelG = new Group()
    coinG = new Group()
    obG = new Group()

    this.addSprites(fuelG,13,fuelImg,0.02)
    this.addSprites(coinG,20,coinImg,0.09)
    this.addSprites(obG,6,obImg,0.04)
  }

  addSprites(group,num,img,scale){
    for(var i=0;i<num;i++){
      var obj = createSprite(random(width/2-150,width/2+150),random(-height*4.5,height-400))
      obj.addImage(img)
      obj.scale = scale
      group.add(obj)
    }
  }

  play(){
    form.remove()
    Player.getPlayersInfo()
    this.leaderboard.html("Leaderboard")
    this.leaderboard.position(width/3-60,40)
    this.leader1.position(width/3-60,80)
    this.leader2.position(width/3-60,130)
  
    if(players!==undefined){
      background("black")
      image(trackImg,0,-height*5,width,height*6)
      this.leaderRanks()
      var index = 0
      for(var i in players){
        index = index+1
        var x=players[i].positionX
        var y=players[i].positionY
        cars[index-1].position.x = x
        cars[index-1].position.y = y+500
        if(index===player.index){
          fill("red");
          ellipse(x, y+500, 60, 60);
          camera.position.y = cars[index-1].position.y
          cars[index-1].overlap(fuelG,function(a,b){
            player.fuel = 100
            b.remove()
          })
          cars[index-1].overlap(coinG,function(a,b){
            player.score = player.score+10
            player.updateDistance()
            b.remove()
          })
        }
      }
      if(keyIsDown(UP_ARROW)){
        player.positionY = player.positionY-10
        player.updateDistance()
      }
      if(keyIsDown(LEFT_ARROW) && player.positionX>width/3-50){
        player.positionX = player.positionX-5
        player.updateDistance()
      }
        if(keyIsDown(RIGHT_ARROW) && player.positionX<width/2+200){
        player.positionX = player.positionX+5
        player.updateDistance()
      }
      drawSprites()
    }

  }
  leaderRanks(){
    var leader1,leader2
    var player = Object.values(players)
    leader1 = player[0].rank+"   "+player[0].name+"   "+player[0].score
    leader2 = player[1].rank+"   "+player[1].name+"   "+player[1].score
    this.leader1.html(leader1)
    this.leader2.html(leader2)
  }
}
