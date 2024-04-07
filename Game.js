/*******************************************************/
// P5.play: Stupid Groom
// Written by Meeeeeeee
/*******************************************************/

// Define variables for the groom sprite
let groomY;
let groomHeight = 50; // Size of groom sprite
let speed = 5; // Speed of groom
let moveUp = false;
let moveDown = false;

// Define variables for score and lives
let score = 0;
let lives = 3;

// Define arrays for pink and green boxes
let pinkBoxes = [];
let greenBoxes = [];

// Define screen states
const START_SCREEN = 0;
const STORY_SCREEN = 1;
const INSTRUCTION_SCREEN = 2;
const GAME_SCREEN = 3;
let ScreenChange = START_SCREEN;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Set position of the groom on the middle of the screen
  groomY = height / 2;
  // Create obstacles
  createObstacles();
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
  // Clear the background to white
  background(255);
  
  // Draw different screens based on ScreenChange
  if (ScreenChange === START_SCREEN) {
    drawStartScreen();
  } else if (ScreenChange === STORY_SCREEN) {
    drawStoryScreen();
  } else if (ScreenChange === INSTRUCTION_SCREEN) {
    drawInstructionScreen();
  } else if (ScreenChange === GAME_SCREEN) {
    drawGameScreen();
  }
}

/*******************************************************/
// Function to draw the start screen
/*******************************************************/
function drawStartScreen() {
  // Draw start screen elements
  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Stupid Groom", width/2, height/2 - 50);
  textSize(20);
  text("Press ENTER to start", width/2, height/2 + 50);
}

/*******************************************************/
// Function to draw the story screen
/*******************************************************/
function drawStoryScreen() {
  // Draw story screen elements
  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Story Screen", width/2, height/2 - 50);
  textSize(20);
  text("Press ENTER to continue", width/2, height/2 + 50);
}

/*******************************************************/
// Function to draw the instruction screen
/*******************************************************/
function drawInstructionScreen() {
  // Draw instruction screen elements
  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Instruction Screen", width/2, height/2 - 50);
  textSize(20);
  text("Press ENTER to continue", width/2, height/2 + 50);
}

/*******************************************************/
// Function to draw the game screen
/*******************************************************/
function drawGameScreen() {
  // Draw paths
  createPaths();
  
  // Draw groom
  fill(255, 255, 255);
  ellipse(50, groomY + groomHeight / 2, 20, 20);
  
  // Move groom
  if (moveUp && groomY > 0) {
    groomY -= speed;
  }
  if (moveDown && groomY < height - groomHeight) {
    groomY += speed;
  }
  
  // Move obstacles
  moveObstacles();
  
  // Draw pink boxes
  for (let i = 0; i < pinkBoxes.length; i++) {
    fill(255, 192, 203);
    rect(pinkBoxes[i].x, pinkBoxes[i].y, 20, 20);
  }
  
  // Draw green boxes
  for (let i = 0; i < greenBoxes.length; i++) {
    fill(144, 238, 144);
    rect(greenBoxes[i].x, greenBoxes[i].y, 20, 20);
  }
  
  // Check for collisions with pink boxes
  checkPinkCollisions();
  
  // Check for collisions with green boxes
  checkGreenCollisions();
  
  // Display score and lives
  fill(0);
  textSize(20);
  text("Score: " + score, 20, 30);
  text("Lives: " + lives, 20, 60);
}

/*******************************************************/
// Function to handle key presses
/*******************************************************/
function keyPressed() {
  if (keyCode === ENTER) {
    if (screenChange === START_SCREEN) {
      screenChange = STORY_SCREEN;
    } else if (screenChange === STORY_SCREEN) {
      screenChange = INSTRUCTION_SCREEN;
    } else if (screenChange === INSTRUCTION_SCREEN) {
      screenChange = GAME_SCREEN;
    }
  } else if (screenChange === GAME_SCREEN) {
    if (keyCode === UP_ARROW) {
      moveUp = true;
    } else if (keyCode === DOWN_ARROW) {
      moveDown = true;
    }
  }
}

/*******************************************************/
// Function to handle key releases
/*******************************************************/
function keyReleased() {
  if (ScreenChange === GAME_SCREEN) {
    if (keyCode === UP_ARROW) {
      moveUp = false;
    } else if (keyCode === DOWN_ARROW) {
      moveDown = false;
    }
  }
}

/*******************************************************/
// Function to create paths
/*******************************************************/
function createPaths() {
  // Draw paths
  stroke(144, 180, 148);
  strokeWeight(10);
  
  // Draw first path
  line(0, height / 4, windowWidth, height / 4);
  
  // Draw second path
  line(0, height / 2, windowWidth, height / 2);
  
  // Draw third path
  line(0, height * 3 / 4, windowWidth, height * 3 / 4);
  
  // Draw fourth path
  line(0, height, windowWidth, height);
}

/*******************************************************/
// Function to create obstacles
/*******************************************************/
function createObstacles() {
  for (let i = 0; i < 2; i++) {
    let x = random(width + 20, width + 200);
    let y = random(height / 4, height * 3 / 4);
    pinkBoxes.push({x: x, y: y});
  }
  
  for (let i = 0; i < 1; i++) {
    let x = random(width + 20, width + 200);
    let y = random(height / 4, height * 3 / 4);
    greenBoxes.push({x: x, y: y});
  }
}

/*******************************************************/
// Function to move obstacles
/*******************************************************/
function moveObstacles() {
  for (let i = 0; i < pinkBoxes.length; i++) {
    pinkBoxes[i].x -= speed;
    if (pinkBoxes[i].x < -20) {
      pinkBoxes[i].x = random(width + 20, width + 200);
      pinkBoxes[i].y = random(height / 4, height * 3 / 4);
    }
  }
  
  for (let i = 0; i < greenBoxes.length; i++) {
    greenBoxes[i].x -= speed;
    if (greenBoxes[i].x < -20) {
      greenBoxes[i].x = random(width + 20, width + 200);
      greenBoxes[i].y = random(height / 4, height * 3 / 4);
    }
  }
}

/*******************************************************/
// Function to check for collisions with pink boxes
/*******************************************************/
function checkPinkCollisions() {
  for (let i = 0; i < pinkBoxes.length; i++) {
    if (50 + 20 > pinkBoxes[i].x && 50 < pinkBoxes[i].x + 20 && groomY + groomHeight > pinkBoxes[i].y && groomY < pinkBoxes[i].y + 20) {
      score++;
      pinkBoxes[i].x = random(width + 20, width + 200);
      pinkBoxes[i].y = random(height / 4, height * 3 / 4);
    }
  }
}

/*******************************************************/
// Function to check for collisions with green boxes
/*******************************************************/
function checkGreenCollisions() {
  for (let i = 0; i < greenBoxes.length; i++) {
    if (50 + 20 > greenBoxes[i].x && 50 < greenBoxes[i].x + 20 && groomY + groomHeight > greenBoxes[i].y && groomY < greenBoxes[i].y + 20) {
      lives--;
      greenBoxes[i].x = random(width + 20, width + 200);
      greenBoxes[i].y = random(height / 4, height * 3 / 4);
      if (lives === 0) {
        gameOver();
      }
    }
  }
}

/*******************************************************/
// Function for game over
/*******************************************************/
function gameOver() {
  // Display game over message
  fill(255, 255, 255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
  noLoop(); // Stop the draw loop
}
