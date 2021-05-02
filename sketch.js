var balloon,database,position;
var baI,bg;

function preload(){
    baI = loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
    bg = loadImage("cityImage.png");
}

function setup(){
    database = firebase.database();
    createCanvas(windowWidth,windowHeight);

    balloon = createSprite(200,200,10,10);
    balloon.addAnimation("bal",baI);
    balloon.scale = 0.7

    var balloonPosition = database.ref('balloon/position');
    balloonPosition.on("value", readPosition, showError);
}

function draw(){
    background(bg);

    if(position !== undefined){

    if(keyDown(UP_ARROW)){
        writePosition(0,-10);
        balloon.scale = balloon.scale-0.01;
    }

    else if(keyDown(DOWN_ARROW)){
        writePosition(0,10);
        balloon.scale = balloon.scale+0.01;
    }

    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
    }

    else if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
    }

    drawSprites();
}

}

function writePosition(x,y){
    database.ref('balloon/position').set({
     'x': position.x + x,
     'y': position.y + y
    })
}

function readPosition(data){
    position = data.val();
    console.log(position.x);
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError(){
    console.log(error);
}