var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":12,"version":"U9Ix9Qp7eKjIb9CGGVMhGy1IUobrMj2V","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"5b8XsR1p_mPtSNQckkMNJJt0smNddXEk","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"c5lyliFtchSjmfmnB7WEcpngGcZI8D1f","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

 var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  
  var monkey = createSprite(200,380,20,50);
  monkey.setAnimation("monkey");


  

  monkey.scale = 0.08;
  monkey.x = 50;

  var ground = createSprite(200,380,800,20);
  
 
  var rockGroup = createGroup();
  var bananaGroup = createGroup();

  

  textSize(16);
  textFont("Georgia");
  textStyle(BOLD);
  
 
  var count = 0;
  
  function draw() {
    
    background("white");
    
    text("Survival Time:  "+ count, 240, 100);
    console.log(gameState);
    
    monkey.collide(ground);
    
    if(gameState === PLAY){
      //move the ground
      ground.velocityX = -(6 + 3*count/100);
      //scoring
      count = count + Math.round(World.frameRate/60);
      
      if (count>0 && count%100 === 0){
        
      }
      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
       
      if(keyDown("space") && monkey.y > 340){
        monkey.velocityY = -12 ;
      }
    
      
      monkey.velocityY = monkey.velocityY + 0.8;
      
      spawnBananas();
    
      spawnRocks();
      
      if(monkey.isTouching(bananaGroup)){
        count = count +3;
        bananaGroup.destroyEach();      
        
        
        
      }
      if(rockGroup.isTouching(monkey)){
        gameState = END;
      }
    }
    
    else if(gameState === END) {
      
      
      //set velcity of each game object to 0
      ground.velocityX = 0;
     monkey.velocityY = 0;
     rockGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      
    
     rockGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      
      
    }
    
    drawSprites();
  }
  
  function reset(){
    gameState = PLAY;
    
    rockGroup.destroyEach();
    bananaGroup.destroyEach();
    
    monkey.setAnimation("monkey");
    
    count = 0;
    
  }
  
  function spawnRocks() {
    if(World.frameCount % 60 === 0) {
      var rock = createSprite(400,365,10,40);
      rock.velocityX = - (6 + 3*count/100);
      
      
     
      rock.setAnimation("Stone");
      
      //assign scale and lifetime to the obstacle           
      rock.scale = 0.1;
      rock.lifetime = 70;
      //add each obstacle to the group
      rockGroup.add(rock);
    }
  }
  
  function spawnBananas() {
    //write code here to spawn the clouds
    if (World.frameCount % 60 === 0) {
      var banana = createSprite(400,320,40,10);
      banana.y = randomNumber(280,320);
      banana.setAnimation("Banana");
      banana.scale = 0.05;
      banana.velocityX = -3;
      
       //assign lifetime to the variable
      banana.lifetime = 134;
      
      //adjust the depth
      banana.depth = monkey.depth;
      monkey.depth = monkey.depth + 1;
      
      //add each cloud to the group
      bananaGroup.add(banana);
    }
    
  }
  




  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
