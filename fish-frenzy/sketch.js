// define initial state of game
let state = 0;
// var for difficulty
let mode = "Easy";
let rightArrowPressed = false;
// vars for all images/players in game
let cat;
let cat1Image;
let cat1ImageL;
let cat2Image;
let cat2ImageL;
let cat3Image;
let cat3ImageL;
let wolf;
let wolfImage;
let wolfImageR;
let fish1;
let fish2;
let fish3;
let fish4;
let fish5;
let fish6;
let fish1Image;
let fish1LeftImage;
let bg;
let endCat;
// vars for game sounds
let start;
let collected;
let lost;
// var to keep score
let score = 0;
// var to save in local storage; will display after every game
let highscore = 0; 
let savedHighscore;
// var to increase for rgb color flow
let rand = 0;
let increasing = true;
// if user selected cat
let catSelected = false;

// load all images 
function preload() {
    cat1Image = loadImage("images/mrsoftpaws.png");
    cat1ImageL = loadImage("images/mrsoftpawsL.png");
    cat2Image = loadImage("images/dukefluffykins.png");
    cat2ImageL = loadImage("images/dukefluffykinsL.png");
    cat3Image = loadImage("images/happypaws.png");
    cat3ImageL = loadImage("images/happypawsL.png");
    fish1Image = loadImage("images/fish1.png");
    fish1LeftImage = loadImage("images/fish1Left.png");
    wolfImage = loadImage("images/wolf.png");
    wolfImageR = loadImage("images/wolfR.png");
    endCat = loadImage("images/endCat.png");
    bg = loadImage("images/bg.png");
    soundFormats('mp3');
    // load song
    start = loadSound("sounds/start.mp3");
    collected = loadSound("sounds/collect.mp3");
    lost = loadSound("sounds/lost.mp3");
}

function setup() {
    // create canvas
    let c = createCanvas(500,500);
    c.parent("#div");
    // text mode center
    textAlign(CENTER);
    // construct our user's cat
    cat = new Cat(200, 400);
    // construct our fish
    fish1 = new Fish(-50, 200, 2, fish1Image);
    fish2 = new Fish(550, 225, -2, fish1Image);
    fish3 = new Fish(-50, 150, 3, fish1Image);
    fish4 = new Fish(550, 75, -1, fish1Image);
    fish5 = new Fish(-50, 175, 1, fish1Image);
    fish6 = new Fish(550, 100, -3, fish1Image);
    // construct our wolf
    wolf = new Wolf(1);
}

function draw() {
    // handle rand variable to do gradient for start screen
    if (increasing) {
        // increment the value
        rand += 0.5;
        // check if it has reached 50
        if (rand >= 50) {
            increasing = false; // change direction to decrease
        }
    } else {
        // decrease the value
        rand -= 0.5;
        // check if it has reached 0
        if (rand <= 0) {
            increasing = true; // change direction to increase
        }
    }
    // define which state the game is in to put proper screen
    if (state == 0) {
        startGame();
    } else if (state == 1) {
        playGame();
        // display and move wolf
        wolf.display();
        // make wolf chase cat
        wolf.chaseCat(cat.x, cat.y);
        // check collision with cat for wolf
        if (wolf.caughtCat(cat.x, cat.y)) {
            // check if score is greater than highscore
            if (score > highscore) {
                // if it is, highscore = score 
                highscore = score; 
                // store in local storage
                localStorage.setItem('highscore', highscore);
            }
            // reset score
            score = 0;
            // set state to end of game
            state = 2;
        }
        // display and move user cat
        cat.display();
        cat.move();
        // display and move all 6 fish 
        fish1.display();
        fish1.movePos();
        fish2.display();
        fish2.moveNeg();
        fish3.display();
        fish3.movePos();
        fish4.display();
        fish4.moveNeg();
        fish5.display();
        fish5.movePos();
        fish6.display();
        fish6.moveNeg();
        // check collision with cat for each fish
        if (
            (fish1.fishTouched(cat.x, cat.y) || fish2.fishTouched(cat.x, cat.y)) ||
            (fish3.fishTouched(cat.x, cat.y) || fish4.fishTouched(cat.x, cat.y)) ||
            (fish5.fishTouched(cat.x, cat.y) || fish6.fishTouched(cat.x, cat.y))
        ) {
            score += 1;
        }
    } else if (state == 2) {
        endGame();
    }
}

// function for if user presses mouse, game state changes 
function mousePressed() {
    // if game not playing, state = 1
    if (state == 0 && (cat.catType != "" && catSelected == true)) {
        start.play();
        state = 1;
    }
    if (state == 2 && (cat.catType != "" && catSelected == true)) {
        resetGame();
    }
}

// function for game start screen
function startGame() {
    // game screen style 
    background(0);
    stroke(2);
    textSize(15);
    // create flowy colors 
    let r = map(rand, 0, 50, 170, 255);
    let g = map(rand, 0, 50, 182, 220);
    let b = map(rand, 0, 50, 220, 255);
    fill(r,g,b, 150);
    for (let i = 0; i < 250; i++) {
        text("Click to Help Your Kitty Catch Some Fish", 250, 25 * i);
    }
    textSize(35);
    let r1 = map(rand, 0, 50, 150, 255);
    let g1 = map(rand, 0, 50, 20, 100);
    let b1 = map(rand, 0, 50, 130, 230);
    fill(r1,g1,b1);
    text("Welcome to Fish Frenzy!", 250, 250);
    fill(r,g,b);
    text("Welcome to Fish Frenzy!", 254, 250);
    textSize(15);
    rect(0,255,500,45);
    fill(0);
    // decide game mode
    text("Game Mode: " + mode, 250, 280);
    if (keyIsDown(RIGHT_ARROW)) {
        if (!rightArrowPressed) {
            if (mode == "Easy") {
                mode = "Medium"; 
                wolf.speed = 1.5;
            } else if (mode == "Medium") {
                mode = "EXTREME";
                wolf.speed = 2;
            } else if (mode == "EXTREME") {
                mode = "Easy";
                wolfSpeed = 1;
            }
        } 
        rightArrowPressed = true;
    } else {
        rightArrowPressed = false;
    }
}

// function for game playing screen
function playGame() {
    // style game
    background(255);
    image(bg, 0, 0, 500, 500);
    // update score while game is playing
    textSize(20);

    text("Score: " + score, 50, 490);
}

// function for game end screen
function endGame() {
    // end screen style
    noStroke();
    background(255, 110, 187);
    // create flowy colors
    let r = map(rand, 0, 50, 170, 255);
    let g = map(rand, 0, 50, 0, 100);
    let b = map(rand, 0, 50, 0, 200);
    fill(r,g,b, 100);
    for (let i = 0; i < 250; i++) {
        text("Select Kitty to Play Again!", 250, 25 * i);
    }
    // draw rect to serve as background for text
    fill(0);
    rect(0,200,500,120);
    textSize(35);
    fill(255);
    text("Your Kitty Was Caught", 248, 275);
    fill(r,g,b);
    text("Your Kitty Was Caught", 250, 275);
    fill(255);
    text(":(", 248, 240);
    fill(r,g,b);
    text(":(", 250, 240);
    // reset the positions of the cat and wolf to ensure they go back
    cat.x = 200;
    cat.y = 400;
    wolf.x = width/2 - 25;
    wolf.y = height/2 - 25;
    fill(255, 110, 187);
    textSize(15);
    // save score if high score
    savedHighscore = localStorage.getItem('highscore');
    if (savedHighscore === null || score > savedHighscore) {
        highscore = score;
        localStorage.setItem('highscore', highscore);
    }
    text("All-Time Highscore: " + savedHighscore, 250, 300);
    image(endCat, 300, 300, 200, 200);
    if (cat.catType == cat1Image || cat.catType == cat1ImageL) {
        image(cat1Image, 0, 350, 150, 150);
    } else if (cat.catType == cat2Image || cat.catType == cat1Image || cat.catType == cat2ImageL) {
        image(cat2Image, 0, 350, 150, 150);
    } else if (cat.catType == cat3Image || cat.catType == cat3ImageL) {
        image(cat3Image, 0, 350, 150, 150);
    }
    catSelected = false;
}

// create class for user's cat 
class Cat {
    // constructor for cat
    constructor(x, y) {
        // store x,y position of cat
        this.x = x;
        this.y = y;
        // store image for cat 
        this.catType = "";
        // check if cat is facing left 
        this.facingLeft = false; 
    }
    
    // show cat's image 
    display() {
        image(this.catType, this.x, this.y, 80, 80);
    }

    // move cat
    move() {
        // make sure there are constraints on x and y
        this.x = constrain(this.x, -18, 420);
        this.y = constrain(this.y, -16.5, 420);
        // WASD controls
        if (keyIsDown(65)) {
            // move left
            this.x -= 2.2;
            // say cat is facing left 
            this.facingLeft = true;
            if (cat.facingLeft == true) {
                if (cat.catType == cat1Image) {
                    cat.catType = cat1ImageL;
                } else if (cat.catType == cat2Image) {
                    cat.catType = cat2ImageL;
                } else if (cat.catType == cat3Image) {
                    cat.catType = cat3ImageL;
                }
            } else {
                if (cat.catType == cat1ImageL) {
                    cat.catType = cat1Image;
                } else if (cat.catType == cat2ImageL) {
                    cat.catType = cat2Image;
                }  else if (cat.catType == cat3ImageL) {
                    cat.catType = cat3Image;
                }
            }
        }
        if (keyIsDown(68)) {
            // move right
            this.x += 2.2;
            // say cat is not facing left
            this.facingLeft = false;
            if (cat.facingLeft == true) {
                if (cat.catType == cat1Image) {
                    cat.catType = cat1ImageL;
                } else if (cat.catType == cat2Image) {
                    cat.catType = cat2ImageL;
                } else if (cat.catType == cat3Image) {
                    cat.catType = cat3ImageL;
                }
            } else {
                if (cat.catType == cat1ImageL) {
                    cat.catType = cat1Image;
                } else if (cat.catType == cat2ImageL) {
                    cat.catType = cat2Image;
                }  else if (cat.catType == cat3ImageL) {
                    cat.catType = cat3Image;
                }
            }
        }
        if (keyIsDown(87)) {
            // move up
            this.y -= 2.2;
        }
        if (keyIsDown(83)) {
            // move down
            this.y += 2.2;
        }
    }
}

// create class for fish 
class Fish {
    // constructor for fish
    constructor(x, y, fishSpeed, fishPic) {
        // store x,y position of fish
        this.x = x;
        this.startingX = x;
        this.y = y;
        // speed speed of fish
        this.fishSpeed = fishSpeed;
        // store image for fish
        this.fishPic = fishPic;
    }
    
    // show fish image 
    display() {
        image(this.fishPic, this.x, this.y, 50, 50);
    }

    // move fish positively; for fish with -x
    movePos() {
        // move fish at its given speed
        this.x += this.fishSpeed;
        // make sure fish pic is correct if fish moves left
        if (this.fishSpeed < 0) {
            this.fishPic = fish1LeftImage;
        }
        // if fish goes past the right edge, reset its position to the left edge
        if (this.x >= width) {
            this.x = this.startingX; 
            this.y = random(75, 230); // randomize the fish's y position
        }
    }

    // move fish negatively; for fish with +x
    moveNeg() {
        // move fish at its given speed
        this.x += this.fishSpeed;
        // make sure fish pic is correct if fish moves left
        if (this.fishSpeed < 0) {
            this.fishPic = fish1LeftImage;
        }
        // if fish goes past the left edge, reset its position to the right edge
        if (this.x <= -75) {
            this.x = this.startingX; 
            this.y = random(75, 230); // randomize the fish's y position
        }
    }

    // see if cat has collected a fish
    fishTouched(x, y) {
        // calculate the center points of the cat and fish
        let catCenterX = x + 100 / 2; 
        let catCenterY = y + 100 / 2;
        let fishCenterX = this.x + 50 / 2; 
        let fishCenterY = this.y + 50 / 2;
    
        // calculate the distance between the centers of the cat and fish
        let d = dist(catCenterX, catCenterY, fishCenterX, fishCenterY);
    
        // calculate the sum of the radii of the cat and fish 
        let catRadius = 100 / 2;
        let fishRadius = 50 / 2; 
    
        // if the distance between the centers is less than the sum of the radii, they have touched
        if (d < (catRadius + fishRadius - 25)) {
            // collision has been detected, give the user a point and reset the fish position
            this.x = this.startingX;
            // play sound
            collected.play();
            // randomize the fish's y position
            this.y = random(75, 230);
            return true;
        } else {
            return false;
        }
    }
    
}

// create class for wolf
class Wolf {
    // constructor for wolf
    constructor(speed) {
        // store x,y position of wolf
        this.x = width/2 - 25;
        this.y = height/2 - 25;
        this.startingX = width/2 - 25;
        this.startingY = height/2 - 25;
        // store speed of wolf
        this.speed = speed;
        // store image of wolf
        this.wolfPic = wolfImage;
        // store where we want wolf to randomly go
        this.destX = random(75, 410);
        this.destX = random(75, 410);
    }

    // display wolf
    display() {
        image(this.wolfPic, this.x, this.y, 75, 75);
    }

    // get wolf to chase cat
    chaseCat(x, y) {

        // calculate the direction to the cat
        let xDist = x - this.x;
        let yDist = y - this.y;
    
        // calculate the distance to the cat
        let d = dist(this.x, this.y, x, y);
    
        // see in which direction to go
        let dx = xDist / d;
        let dy = yDist / d;
    
        // move the object towards the cat
        this.x += dx * this.speed;
        this.y += dy * this.speed;
        if (dx > 0) {
            this.wolfPic = wolfImageR;
        } else {
            this.wolfPic = wolfImage;
        }
    }

    // check if wolf has caught cat
    caughtCat(x,y) {
        // calculate the center points of the cat and wolf
        let catCenterX = x + 100 / 2; 
        let catCenterY = y + 100 / 2;
        let wolfCenterX = this.x + 100 / 2; 
        let wolfCenterY = this.y + 100 / 2;
    
        // calculate the distance between the centers of the cat and wolf
        let d = dist(catCenterX, catCenterY, wolfCenterX, wolfCenterY);
    
        // calculate the sum of the radii of the cat and fish 
        let catRadius = 100 / 2;
        let wolfRadius = 100 / 2; 
        
        // if the distance between the centers is less than the sum of the radii, they have touched
        if (d < (catRadius + wolfRadius - 45)) {
            // wolf goes back to starting position
            this.x = this.startingX;
            this.y = this.startingY;
            // play lost sound
            lost.play();
            // return true
            return true;
        } else {
            return false;
        }
    }
    
}

// function for when user changes cat pic 
function changeCat(element) {
    if (state != 1) {
        if (element.value == "1") {
            cat.catType = cat.facingLeft ? cat1ImageL : cat1Image;
        } else if (element.value == "2") {
            cat.catType = cat.facingLeft ? cat2ImageL : cat2Image;
        } else if (element.value == "3") {
            cat.catType = cat.facingLeft ? cat3ImageL : cat3Image;
        } else if (element.value == "0") {
            cat.catType = "";
        }
        resetGame(); // reset the game when a new cat is selected.
    }
    catSelected = true;
    document.getElementById('catSelect').value = '0';
}

// reset game so user goes back to start screen after selecting new cat
function resetGame() {
    state = 0;
    score = 0;
    catSelected = false;
    // Reset the positions of the cat and wolf.
    cat.x = 200;
    cat.y = 400;
    wolf.x = width/2 - 25;
    wolf.y = height/2 - 25;
  }
