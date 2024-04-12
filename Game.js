/*******************************************************/
// P5.play: Stupid Groom
// Written by Meeeeeeee
/*******************************************************/

// Define variables for the groom sprite
let groomX = 50;
let groomY;
let groomHeight = 50; // Size of groom sprite
let speed = 5; // Speed of groom
let moveUp = false;
let moveDown = false;
let moveRight = false;

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
const YOU_WON_SCREEN = 4; // New screen state
const GAME_OVER_SCREEN = 5; // New screen state for game over
let screenchange = START_SCREEN; // Corrected variable name

// Timer variables
let startTime;
const gameDuration = 30 * 1000; // 30 seconds in milliseconds

// Purple square sprite
let purpleSprite;

/*******************************************************/
// Function to create sprite (explicit definition)
/*******************************************************/
function createSprite(x, y, width, height) {
  let sprite = {
    position: createVector(x, y),
    width: width,
    height: height,
    visible: true,
    shapeColor: color(255),
    draw: function() {
      if (this.visible) {
        fill(this.shapeColor);
        rect(this.position.x, this.position.y, this.width, this.height);
      }
    }
  };
  return sprite;
}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Set position of the groom on the middle of the screen
  groomY = height / 2;
  // Create obstacles
  createObstacles();
  // Start the timer
  startTime = millis();

  // Create purple sprite
  purpleSprite = createSprite(width - 100, height / 2, 30, 30);
  purpleSprite.shapeColor = color(128, 0, 128);
  purpleSprite.visible = false;
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
  // Clear the background to white
  background(255);
  
  // Draw different screens based on screenchange
  if (screenchange === START_SCREEN) {
    drawStartScreen();
  } else if (screenchange === STORY_SCREEN) {
    drawStoryScreen();
  } else if (screenchange === INSTRUCTION_SCREEN) {
    drawInstructionScreen();
  } else if (screenchange === GAME_SCREEN) {
    // Check if 30 seconds have passed
    if (millis() - startTime < gameDuration) {
      drawGameScreen();
    } else {
      // Transition to the "You Won!" screen
      screenchange = YOU_WON_SCREEN;
    }
  } else if (screenchange === YOU_WON_SCREEN) {
    drawWhiteScreen();
    drawYouWonScreen();
  } else if (screenchange === GAME_OVER_SCREEN) {
    drawGameOverScreen();
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
  text(" Stupid Groom", width/2, height/2 - 50);
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
  text("An absolute disaster has appeared on the groom's and bride's wedding day! They are expected to get married in a beautiful forest, unfortunately, the groom left all the wedding accessories in the forest with the broken-down car! What a stupid Groom! We should help him get the items back and make his bride happy! Let's go!! ", width/2, height/2);
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
  ellipse(groomX, groomY + groomHeight / 2, 20, 20);
  
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
    if (screenchange === START_SCREEN) {
      screenchange = STORY_SCREEN;
    } else if (screenchange === STORY_SCREEN) {
      screenchange = INSTRUCTION_SCREEN;
    } else if (screenchange === INSTRUCTION_SCREEN) {
      screenchange = GAME_SCREEN;
    } else if (screenchange === YOU_WON_SCREEN || screenchange === GAME_OVER_SCREEN) {
      resetGame();
    }
  } else if (screenchange === GAME_SCREEN) {
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
  if (screenchange === GAME_SCREEN) {
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
  // Create pink and green boxes
  for (let i = 0; i < 4; i++) {
    let xPink = random(width + 20, width + 200);
    let yPink = 0; // Default y-coordinate
    switch(i) { // Distribute obstacles across all four paths
      case 0: // Top path
        yPink = random(height / 8, height / 4);
        break;
      case 1: // Second path
        yPink = random(height / 2, height * 5 / 8);
        break;
      case 2: // Third path
        yPink = random(height * 3 / 4, height * 7 / 8);
        break;
      case 3: // Bottom path
        yPink = random(height * 15 / 16, height);
        break;
    }
    pinkBoxes.push({x: xPink, y: yPink});
    
    let xGreen = random(width + 20, width + 200);
    let yGreen = 0; // Default y-coordinate
    switch(i) { // Distribute obstacles across all four paths
      case 0: // Top path
        yGreen = random(height / 8, height / 4);
        break;
      case 1: // Second path
        yGreen = random(height / 2, height * 5 / 8);
        break;
      case 2: // Third path
        yGreen = random(height * 3 / 4, height * 7 / 8);
        break;
      case 3: // Bottom path
        yGreen = random(height * 15 / 16, height);
        break;
    }
    greenBoxes.push({x: xGreen, y: yGreen});
  }
}

/*******************************************************/
// Function to move obstacles
/*******************************************************/
function moveObstacles() {
  // Move pink and green boxes
  for (let i = 0; i < pinkBoxes.length; i++) {
    pinkBoxes[i].x -= speed;
    if (pinkBoxes[i].x < -20) {
      pinkBoxes[i].x = random(width + 20, width + 200);
    }
  }
  for (let i = 0; i < greenBoxes.length; i++) {
    greenBoxes[i].x -= speed;
    if (greenBoxes[i].x < -20) {
      greenBoxes[i].x = random(width + 20, width + 200);
    }
  }
}

/*******************************************************/
// Function to check for collisions with pink boxes
/*******************************************************/
function checkPinkCollisions() {
  for (let i = 0; i < pinkBoxes.length; i++) {
    if (groomX + 20 > pinkBoxes[i].x && groomX < pinkBoxes[i].x + 20 && groomY + groomHeight > pinkBoxes[i].y && groomY < pinkBoxes[i].y + 20) {
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
    if (groomX + 20 > greenBoxes[i].x && groomX < greenBoxes[i].x + 20 && groomY + groomHeight > greenBoxes[i].y && groomY < greenBoxes[i].y + 20) {
      lives--;
      greenBoxes[i].x = random(width + 20, width + 200);
      greenBoxes[i].y = random(height / 4, height * 3 / 4);
      if (lives === 0) {
        screenchange = GAME_OVER_SCREEN;
      }
    }
  }
}

/*******************************************************/
// Function for game over
/*******************************************************/
function drawGameOverScreen() {
  // Display game over message
  fill(255, 255, 255);
  textSize(50)
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
  textSize(20);
  text("Press ENTER to replay", width / 2, height / 2 + 50);
}

/*******************************************************/
// Function to draw the "You Won!" screen
/*******************************************************/
function drawYouWonScreen() {
  // Display "You Won!" message
  fill(255, 255, 255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("You Won!", width / 2, height / 2);
  textSize(20);
  text("Press ENTER to replay", width / 2, height / 2 + 50);
}

/*******************************************************/
// Function to draw a white screen
/*******************************************************/
function drawWhiteScreen() {
  // Draw a white background
  background(255);
}

/*******************************************************/
// Function to reset the game
/*******************************************************/
function resetGame() {
  // Reset variables
  score = 0;
  lives = 3;
  groomX = 50;
  groomY = height / 2;
  pinkBoxes = [];
  greenBoxes = [];
  createObstacles();
  startTime = millis();
  screenchange = START_SCREEN;
}

/*******************************************************/
// Function to handle mouse clicks
/*******************************************************/
function mouseClicked() {
  if (screenchange === YOU_WON_SCREEN || screenchange === GAME_OVER_SCREEN) {
    resetGame();
  }
}
