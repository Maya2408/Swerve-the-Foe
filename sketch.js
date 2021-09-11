
var airoplane, plane, dragon1, dragon1Img, dragon2, dragon2Img;
var lightning, lightningImg;
var sky;
var enemyGroup;
var dragon;
var restart, restartImg;
var explosion, explosionImg, fire, fireImg;
var thunderSound;

var PLAY = 1;
var END = 0;
var gameState =PLAY;

function preload(){
    plane = loadImage("airoplane.png");
    dragon1Img = loadAnimation("uno.png", "dos.png", "tres.png");
    dragon2Img = loadAnimation("one.png", "two.png", "three.png");
    lightningImg = loadImage("lightning.png");
    sky = loadImage("skyBackground.jpg");
    restartImg = loadImage("restart.png");
    explosionImg = loadImage("explosion.png");
    fireImg = loadImage("fire breath.png");

    thunderSound = loadSound("thunder.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  airoplane = createSprite(windowWidth-150, 500);
  airoplane.addImage(plane);
  airoplane.scale=0.5;
  airoplane.setCollider("rectangle", 0, 0, 600, 500);
  //airoplane.debug = true;

   restart = createSprite(700, 350);
   restart.addImage(restartImg);
   

  score = 0;

  enemyGroup = new Group();

}


function draw(){
    background(sky);

     if(gameState === PLAY){

      restart.visible = false;
      airoplane.visible = true;

      if(keyDown(UP_ARROW)){
        airoplane.y -= 4;
      }
  
      if(keyDown(DOWN_ARROW)){
        airoplane.y += 4;
      }
  
      if(keyDown(RIGHT_ARROW)){
        airoplane.x += 4;
      }
  
      if(keyDown(LEFT_ARROW)){
        airoplane.x -= 4;
      }

      enemy();
      points();

       if(enemyGroup.isTouching(airoplane)){
        fire = createSprite(dragon.x+50, dragon.y);
        fire.addImage(fireImg);
        fire.scale=0.5;
        thunderSound.play();
      
        gameState = END;
        airoplane.addImage(explosionImg);
      }
     }
       else if(gameState === END){
         enemyGroup.destroyEach();
         //airoplane.visible = false;
         fire.visible = false;
         restart.visible = true;
       }

       if(mousePressedOver(restart)){
         reset();
       }

    drawSprites();
}

function enemy(){
  if(frameCount % 200 === 0){
    dragon = createSprite(0, random(20, 700));
    dragon.velocityX = 3;
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: dragon.addAnimation("d",dragon1Img);
              dragon.scale=1.5;
              break;
      case 2: dragon.addAnimation("d",dragon2Img);
              dragon.scale=1;
              break;
      case 3: dragon.addImage(lightningImg);
              dragon.scale=0.5;
              break;
      default: break;
    }
    dragon.lifetime = 400;
    //dragon.scale=1;
    //dragon.debug = true;

    enemyGroup.add(dragon);
  }
}

function points(){
  score = score + Math.round(getFrameRate()/60);
  textSize(30);
  fill("yellow");
  text("score: " + score, windowWidth-150, 100);
}

function reset(){
  gameState = PLAY;
  score = 0;
  airoplane.addImage(plane); 
}