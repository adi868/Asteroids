let ship;
let rotation;
let arrow;
let asteroids = [];
let lasers = [];
let score = 0;
let message;

function preload() {
	arrow = loadImage("images/triangle.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	for (let i = 0; i < 5; i++) {
		asteroids.push(new Asteroid());
	}
}

function draw() {
	background(0);
	for (let i = 0; i < asteroids.length; i++) {
		if (ship.hits(asteroids[i])) {
			message = 'OOPS! You got hit. Press SPACEBAR to try again'
			score = 0;
		}
		asteroids[i].render();
		asteroids[i].update();
		asteroids[i].edges();
	}
	for (let i = lasers.length - 1; i >= 0; i--) {
		message = '';
		lasers[i].render();
		lasers[i].update();
		if (lasers[i].offscreen()) {
			lasers.splice(i, 1);
		} else {
			for (let j = asteroids.length - 1; j >= 0; j--) {
				if (lasers[i].hits(asteroids[j])) {
					//remove asteroids if size falls below threshold
					score++;
					if (asteroids[j].r > 10) {
						let newAsteroids = asteroids[j].breakup();
						console.log(newAsteroids);
						//merge arrays
						asteroids = asteroids.concat(newAsteroids)
					}
					asteroids.splice(j, 1);
					lasers.splice(i, 1);
					break;
				}
			}
		}
	}
	ship.render();
	ship.turn();
	ship.update();
	ship.edges();
	showScore();
}

function showScore(){
	textFont("Helvetica");
	textSize(20);
	fill(255);
	text(`SCORE: ${score}`, 50, 50);
	text(message, 50, 90);
	if(score >= 10){
		text(`YOU WIN`, width/2, height/2);
	}
}

function keyReleased() {
	ship.setRotation(0);
	ship.boosting(false);
}

function keyPressed() {
	if (key == " ") {
		message = '';
		lasers.push(new Laser(ship.pos, ship.heading));
	}
	if (keyCode == RIGHT_ARROW) {
		ship.setRotation(0.1);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-0.1);
	} else if (keyCode == UP_ARROW) {
		ship.boosting(true);
	}
}
