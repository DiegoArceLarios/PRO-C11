var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg,bombImg;
var i;
var timer;
var time1;
var time2;
var n;
var pom,pomImg;
var bomb1,bomb2,bomb3;

function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  bombImg = loadImage("bomb.png");
  pomImg = loadImage("power.png");
}

function setup(){
  
  createCanvas(400,400);
  
// Mover el fondo
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=1.2;

//crear sprite de niño corriendo
boy = createSprite(180,340,30,30);
boy.scale=0.05;
boy.addAnimation("JakeRunning",boyImg);
  
pom = createSprite(800,800,2,2);
pom.addImage(pomImg);
pom.scale = 0.4;

leftBoundary=createSprite(0,0,100,800);

 leftBoundary.invisible = false;
 leftBoundary.visible = true;
 leftBoundary.invisible = true;
 leftBoundary.visible = false;


rightBoundary=createSprite(410,0,100,800);
rightBoundary.visible = false;

timer = createSprite(1000,989,20,20);
time1 = createSprite(1000,900,50,10);
time2 = createSprite(1000,1000,50,10);

timer.velocityY = -5;

bomb1 = createSprite(100,800,1,1);
bomb2 = createSprite(200,800,1,1);
bomb3 = createSprite(300,800,1,1);

bomb1.addImage(bombImg);
bomb2.addImage(bombImg);
bomb3.addImage(bombImg);

fill("red");
textSize(25);

n = 0;
}

function draw() {
  background(0);
  
  if(path.velocityY > 0){
  boy.x = World.mouseX;
  }else{
  boy.x = 800;
  }
  edges= createEdgeSprites();
  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
  
  //código para reiniciar el fondo

  if(path.y > 350 ){
    path.y = height/2;
  }

  if(path.velocityY === 0){
    text("Has perdido",125,200);
    bomb1.velocityY = 0;
    bomb2.velocityY = 0;
    bomb3.velocityY = 0;
  }
  
  drawSprites();

  if(timer.bounceOff(time1)||timer.bounceOff(time2)){
    n = round(random(1,8));
  }
  if(n===1&&bomb1.y>420){
    bomb1.y=20;
    bomb1.velocityY=4;
    bomb1.scale = 0.1;
  }
  if(n===2&&bomb2.y>420){
    bomb2.y=20;
    bomb2.velocityY=4;
    bomb2.scale = 0.1;
  }
  if(n===3&&bomb3.y>420){
    bomb3.y=20;
    bomb3.velocityY=4;
    bomb3.scale = 0.1;
  }
  console.log(n);

  if(boy.isTouching(bomb1)||boy.isTouching(bomb2)||boy.isTouching(bomb3)){
    path.velocityY = 0;
    boy.x = boy.x+1;
    bomb1.velocityY = 0;
    bomb2.velocityY = 0;
    bomb3.velocityY = 0;
    pom.y = boy.y;
    pom.x = boy.x;
  }
}
