/*******************************************************/
// P5.play: 12COMP Programming Assessment
// Written by Meeeeeee 
/*******************************************************/

// Define variables to store the position and size of the circle
let circleX;
let circleY;
let circleDiameter = 50;
let speed = 2; // Slow speed for the moment
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
  createCanvas(windowWidth, windowHeight); // Creating a canvas of the size of the screen
  createPaths(); // Call function to create paths
  // Initial position of the circle (on the left-hand side)
  circleX = 50; // Set X position to the left edge of the screen
  circleY = height / 2; // Set Y position to the middle of the screen
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
  // Clear the background to white
  background(255);
  
  // Draw paths
  createPaths();
  
  // Move the circle forward
  circleX += speed;
  
  // Draw the purple circle sprite

  ellipse(circleX, circleY, circleDiameter, circleDiameter); // Draw the circle
  
  // Check for arrow key inputs and move the circle up or down accordingly
  if (keyIsDown(UP_ARROW) && circleY > 150) {
    circleY -= speed;
  }
  if (keyIsDown(DOWN_ARROW) && circleY < 350) {
    circleY += speed;
  }
}

/*******************************************************/
// Function to create paths
/*******************************************************/
function createPaths() {
  // Draw paths
  stroke(144 ,180, 148); // Set the stroke color for paths (not exactly sure of the colour yet)
  strokeWeight(10); // Set the stroke weight for paths
  
  // Draw first path
  line(0, 100, windowWidth, 100);
  
  // Draw second path
  line(0, 200, windowWidth, 200); 
  
  // Draw third path
  line(0, 300, windowWidth, 300);
  
  // Draw fourth path
  line(0, 400, windowWidth, 400);
}
