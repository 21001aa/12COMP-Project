/*******************************************************/
// P5.play: 12COMP Programming Assessment
// Written by Angela Anish
/*******************************************************/

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
  createCanvas(windowWidth, windowHeight); // Creating a canvas of the size of the screen
  createPaths(); // Creating function to create the paths
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {

}

/*******************************************************/
// Main screen functions
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
  
   // Draw fifth path
  line(0, 500, windowWidth, 500);
}

/*******************************************************/
//  END OF APP
/*******************************************************/
