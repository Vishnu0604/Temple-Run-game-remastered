var ground,backgroundImage;
var player,playerRunning;
var enemy,enemyImage;
var stars,star_Image,star1,star2;
var gameState = "play"
var gameover,gameoverImage;
var score = 0;
var restart,restartImage;

function preload() {
  backgroundImage = loadImage("background image.jpg");
  playerRunning =loadAnimation("Runner-1.png","Runner-2.png");
  enemyImage = loadImage("enemy.png");
  //star_Image = loadImage("Trophy.png");
  star1 = loadImage("diamonds.png");
  star2 = loadImage("Trophy.png");
  gameoverImage = loadImage("gameover.png")
  restartImage = loadImage("restart Image.png");
}

function setup(){
  createCanvas  (400,500);
  
  ground = createSprite(200,250,400,600);
  ground.addImage(backgroundImage);
  ground.scale = 4;
  
  //ground.velocityY = 4;
  
  restart = createSprite(335,50,50,50);
  restart.addImage(restartImage);
  restart.scale = 0.3;
  

  
  player = createSprite(200,370,30,50);
  player.addAnimation("running",playerRunning);
  player.scale = 0.06
  
  gameover = createSprite(200,250);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.5
  gameover.visible = false;
  
  enemyGroup  = createGroup();
  starsGroup = createGroup();
}

function draw(){
 background("darkgreen");
  
    ground.velocityY = (4 + 3* score/0.5);
  
  if(gameState === "play"){
    
    restart.visible = false;
    
    if(ground.y>400){
      ground.y = ground.height/2;
    }


    if(keyDown("left")){
      player.x  = player.x-5
    }

    if(keyDown("right")){
      player.x = player.x+5
    }
    if(enemyGroup.isTouching(player)){
      gameState  = "end";
    }
    
    if(starsGroup.isTouching(player)){
      score = score+1;
      starsGroup.destroyEach();
      
    }
    
    
    spawnEnemy();
    spawnStars();
  }  
  
  
  
  
  if(gameState === "end"){
    ground.velocityY = 0;
    enemyGroup.setVelocityYEach(0);
    starsGroup.setVelocityYEach(0);
    enemyGroup.destroyEach();
    starsGroup.destroyEach();
    gameover.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
      reset();
    }
 }
    drawSprites();
  
  textFont("forte")
  fill("black")
  textSize(50);
  text("score :"+ score,200,460)
  
  
}

function spawnEnemy(){
  if (frameCount % 71===0){
    var enemy = createSprite(10,-10,10,40);
     enemy.velocityY = (6 + score/0.5);
    enemy.x = Math.round(random(50,350));
    enemy.addImage(enemyImage);
    enemy.scale = 0.20
    enemyGroup.add(enemy);
    enemy.lifetime = 100;
}
  
}

function spawnStars(){
  if (frameCount %127 ===0){
    var stars = createSprite(10,-10,10,40);
   stars.velocityY = (6 + score/0.5);;
    stars.x = Math.round(random(50,350));
    
    var num = Math.round(random(1,2));
    switch(num){
      case 1:stars.addImage(star1);
      stars.scale = 0.05
      break;
      case 2:stars.addImage(star2);
      stars.scale = 0.15
      break;
      default : break;
}
    stars.lifetime = 100
    
    starsGroup.add(stars);
   }
}
function reset(){
  gameState="play"
  gameover.visible=false
  restart.visible=false
  starsGroup.destroyEach();
  enemyGroup.destroyEach();
  score=0;
}