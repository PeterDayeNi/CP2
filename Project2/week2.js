let video;
let yolo;
let status;
let objects = [];

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);

  // Create a YOLO method
  yolo = ml5.YOLO(video, startDetecting);

  // Hide the original video
  video.hide();
  status = select('#status');
}

function draw() {
  
  var numberOfPeople = 0;
  
  image(video, 0, 0, width, height);
  
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].label == "person"){
      numberOfPeople = numberOfPeople + 1;
    }
    
    noStroke();
    fill(0, 255, 0);
    text(objects[i].label, objects[i].x * width, objects[i].y * height - 5);
    
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    
    if (numberOfPeople == 1){
      textAlign(CENTER, TOP);
      noStroke();
      fill(255, 255, 255);
      textSize(12 * numberOfPeople);
      text("STOP LOOKING AT ME", width/2, 0);
      rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    }
  }
}

function startDetecting() {
  status.html('Model loaded!');
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });
}
