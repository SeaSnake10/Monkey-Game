var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var ground;
var FoodGroup, obstacleGroup
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);

  monkey = createSprite(40,145,1,1);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(10,190,1200,20);
  ground.x = ground.width/2;
  
  
  Foodgroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
background("skyblue");
ground.shapeColor = "green";
  
if (gameState===PLAY){
ground.velocityX = -3;
  
if(ground.x < 0){
    ground.x = ground.width/2;
}
  
if(monkey.isTouching(Foodgroup)){
  Foodgroup.destroyEach();
}
  
if(keyDown("space")&& monkey.y >= 100){
  monkey.velocityY = -12;
}
  
}

monkey.velocityY = monkey.velocityY + 0.8;
  
if(monkey.isTouching(obstacleGroup)){
  gameState = END;
}
  
if(gameState===END){
  ground.velocityX = 0;
  monkey.velocityX = 0;
  Foodgroup.destroyEach();
  obstacleGroup.destroyEach();
  obstacleGroup.setLifetimeEach(-1);
  Foodgroup.setLifetimeEach(-1); 
  obstacleGroup.setVelocityXEach(0);
  Foodgroup.setVelocityXEach(0);
}

stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate());
text("Survival Time:" + survivalTime, 20, 50);
   
monkey.collide(ground);
  
spawnBanana(); 
spawnRocks();
drawSprites();
  
}

function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(570,20,10,10);
    banana.y = Math.round(random(50,170));
    banana.addImage("fruits", bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -4;
    banana.lifetime = 100;
    Foodgroup.add(banana);
  }
}

function spawnRocks(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,160,1,1);
    obstacle.addImage("r", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 90;
    obstacleGroup.add(obstacle);
  }
}


