// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO and p5.js
=== */

let video;
let yolo;
let status;
let objects = [];

function setup() {
  createCanvas(1200, 800);
  video = createCapture(VIDEO);
  video.size(1200, 800);

  // Create a YOLO method
  yolo = ml5.YOLO(video, startDetecting);

  // Hide the original video
  video.hide();
  status = select('#status');
}

function draw() {
  
  image(video, 0, 0, width, height);
  background(0);
  
  for (let i = 0; i < objects.length; i++) {

    if (objects[i].label == "person"){
    copy(video, objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height, objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height)
    
    filter(GRAY);
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
