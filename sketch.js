var balloon,bg,balloonL2,balloonL1,balloonL3,balloonX
var position;
function preload(){
  bg = loadImage("images/Hot Air Ballon-01.png");
  balloonL1 = loadImage("images/Hot Air Ballon-02.png");
  balloonL2 = loadImage("images/Hot Air Ballon-03.png");
  balloonL3 = loadImage("images/Hot Air Ballon-04.png");
}

function setup() {
  var canvas = createCanvas(500,500);
  var database = firebase.database();
  balloon = createSprite(200,200);
  balloon.addAnimation("balloon",balloonL1,balloonL2,balloonL3);
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readHeight,showError);
}

function draw() {
  background(bg); 
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    if(balloon.scale<1){
      updateHeight(0,-10);
    }
    if(balloon.scale = 0.1){
      balloon.scale = balloon.scale -0.05;
    }
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    if(balloon.scale<1){
      balloon.scale=balloon.scale+0.05;
    }
  }
  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/position').set({
    'x': position.x+x,
    'y':position.y+y
  });
}

function readHeight(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("There is an error.");
}