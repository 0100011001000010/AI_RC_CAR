// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/8wrBCilwv/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

//Serial
let serial;
let wentStraight;
let goingRight;
let goingLeft;


// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(720, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(720, 480);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  
  serial = new p5.SerialPort();
  
  serial.list();
  serial.open('COM3', {baudRate: 9600})
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
  sendSerial();
}
function delay(ms) {
var cur_d = new Date();
var cur_ticks = cur_d.getTime();
var ms_passed = 0;
while(ms_passed < ms) {
var d = new Date(); // Possible memory leak?
var ticks = d.getTime();
ms_passed = ticks - cur_ticks;
// d = null; // Prevent memory leak?
}
}

// && wentRight != true
function sendSerial(){
  if(label == "Go" && wentStraight != true){
    serial.write(100);
    wentStraight= true;
    
  }
  if(label == "Stop"){
    wentStraight = false;
    goingRight = false;
    goingLeft = false;
  }
  if(label == "Right" && goingRight != true ) {
    serial.write(114)
    goingRight = true;
    goingLeft = false;
    wentStraight = false;
    
    
  }
  if(label == "Left" && goingLeft != true) {
    serial.write(108)
    goingLeft = true;
    goingRight = false;
    wentStraight = false;
    
    
  }
}