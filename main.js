img="";
status = "";
object = [];

function preload(){

    img = loadImage("dog_cat.jpg");

}

function setup(){

    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    objectDetector = ml5.objectDetector("Cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object is being identified";

}

function modelLoaded(){

    console.log("Model has been initialized");
    status = true;
    objectDetector.detect(video, gotResults);

}

function gotResults(error,results){

    if (error){

        console.error;

    }
    else{
    console.log(results);
    object = results;
    }

}

function draw(){

    image(video, 0, 0, 640, 420);
    if(status != ""){

        for(i=0; i < object.length; i++){
            
            objectDetector.detect(video, gotResults);

            document.getElementById("status").innerHTML = "Status : Object has been detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects : " + object[i].length;

            r = random(255);
            g = random(255);
            b = random(255);

            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

        }

    }

}