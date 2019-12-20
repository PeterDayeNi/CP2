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

var scoreLeft = 0;
var scoreRight = 0;

var puck = {
  x: 400,
  y: 120,
  vx: 1,
  vy: -2,
  size: 15,
  }

var paddle1x 
var paddle2x

function setup() {
  createCanvas(800, 300);
  video = createCapture(VIDEO);
  video.size(800, 600);

  // Create a YOLO method
  yolo = ml5.YOLO(video, startDetecting);

  // Hide the original video
  video.hide();
  status = select('#status');
}

function draw() {
  
  // Mirror Video
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, -150, width, 600);
   print (objects.map( x => x.label));
  
  // Detects if PERSON is on left or right & PADDLES
  for (let i = 0; i < objects.length; i++) {
    stroke(0);
   
    if (objects[i].label == 'person') {
      // Left Paddle
      if (objects[i].x + objects[i].w / 2 < 0.5) {
        fill(255);
        paddle1x = objects[i].y * 600;
        rect(25, paddle1x, 12, 75);
      }
      // Right Paddle
      else if (objects[i].x + objects[i].w > 0.5) {
        fill(255);
        paddle2x = objects[i].y * 600;
        rect(width - 25, paddle2x, 12, 75);
      }
    }
}
 
  // Score counters
  translate(video.width, 0);
  scale(-1, 1);
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("LeftPlayerScore: " + scoreLeft, 30, 25);
  textAlign(RIGHT);
  text("RightPlayerScore: " + scoreRight, width-30, 25);
  
  // Draw the puck
  rectMode(CENTER);
  rect(puck.x, puck.y, puck.size, puck.size);
  
  // Update the puck position
  puck.x += puck.vx;
  puck.y += puck.vy;
  
  // Check if puck is off the top or bottom screen
  if (puck.y < 0 || puck.y > height) {
    puck.vy *= -1;
  }
  
  // Check if puck is hitting a paddle
  if (puck.x < 25 && puck.y > paddle1x && puck.y < paddle1x + 75) {
    puck.vx *= -1;
  }
  if (puck.x > width - 25 && puck.y > paddle2x && puck.y < paddle2x + 75) {
    puck.vx *= -1;
  }
  
  // Check if a player scored
  if (puck.x > width) {
		puck.x = width/2
		puck.y = height/2
		
		if (random() > 0.5) 
			a = 1;
		else 
			a = -1;
		
		puck.vx *= a
		puck.vy *= a
		scoreLeft ++
  }
	
  if (puck.x < 0) {
 		puck.x = width/2
		puck.y = height/2
		
		if (random() > 0.5) 
			a = 1;
		else 
			a = -1;
		
		puck.vx *= a
		puck.vy *= a
		scoreRight ++
  }
 
}

function startDetecting() {
  status.html('Loaded.');
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });
}
