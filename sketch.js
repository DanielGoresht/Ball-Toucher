
var balls = [];
var squares = [];
var x = 0;

function preload() {
	// ding = loadSound('ding.mp3');
	// key = loadSound('key.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	masterVolume(0.3);
	rectMode(CENTER);
}

function draw() {
	background(255);
	//   key.rate(.8);

	if (random(0, 100) > 99) {
		createSquare();
	}

	if (mouseIsPressed) {
		createBall(mouseX, mouseY);

	}



	for (let i = 0; i < squares.length; i++) {
		fill(squares[i].color);
		noStroke();
		squares[i].x = squares[i].x + squares[i].xspeed;
		squares[i].y = squares[i].y + squares[i].yspeed;

		rect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
	}

	for (let i = 0; i < balls.length; i++) {
		fill(balls[i].color);
		noStroke();
		balls[i].x = balls[i].x + balls[i].xspeed;
		//check for hitting walls
		if (balls[i].x + balls[i].width / 2 > width) {
			balls[i].x = width - balls[i].width / 2;
			balls[i].xspeed *= -1;
			// key.play();
		}
		if (balls[i].x <= balls[i].width / 2) {
			balls[i].x = balls[i].width / 2;
			balls[i].xspeed *= -1;
			// key.play();
		}
		balls[i].y = balls[i].y + balls[i].yspeed;

		if (balls[i].y + balls[i].height / 2 > height) {
			balls[i].y = height - balls[i].height / 2;
			balls[i].yspeed *= -1;
			// key.play();
		}
		if (balls[i].y <= balls[i].height / 2) {
			balls[i].y = balls[i].height / 2;
			balls[i].yspeed *= -1
			// key.play();
		}

		//hit dectection
		for (let j = 0; j < squares.length; j++) {
			//check for collision anywhere
			if (balls[i].x + balls[i].width / 2 > squares[j].x - squares[j].width / 2 &&
				balls[i].x - balls[i].width / 2 < squares[j].x + squares[j].width / 2 &&
				balls[i].y + balls[i].height / 2 > squares[j].y - squares[j].height / 2 &&
				balls[i].y - balls[i].height / 2 < squares[j].y + squares[j].height / 2) {
				//step back and check if it was on the side (left or right)
				if (balls[i].x + balls[i].width / 2 > squares[j].x - squares[j].width / 2 &&
					balls[i].x - balls[i].width / 2 < squares[j].x + squares[j].width / 2 &&
					balls[i].y + balls[i].height / 2 - balls[i].yspeed > squares[j].y - squares[j].height / 2 - squares[j].yspeed &&
					balls[i].y - balls[i].height / 2 - balls[i].yspeed < squares[j].y + squares[j].height / 2 - squares[j].yspeed) {
					balls[i].xspeed *= -1;
					balls[i].x += balls[i].xspeed;
				}
				//check if it was top or bottom
				else {
					balls[i].yspeed *= -1;
					if (squares[j].yspeed / 2 > balls[i].yspeed && balls[i].yspeed < 0) {
						balls[i].yspeed = squares[j].yspeed - balls[i].yspeed;
						balls[i].y += balls[i].yspeed;
					}
					else {
						balls[i].y += balls[i].yspeed;
					}

				}
				while (balls[i].x + balls[i].width / 2 > squares[j].x - squares[j].width / 2 && balls[i].x - balls[i].width / 2 < squares[j].x + squares[j].width / 2 && balls[i].y + balls[i].height / 2 > squares[j].y - squares[j].height / 2 && balls[i].y - balls[i].height / 2 < squares[j].y + squares[j].height / 2) {
					balls[i].x += balls[i].xspeed;
					if (balls[i].y > squares[j].y) {
						balls[i].y += 1;
					}
					else {
						balls[i].y -= 1;
					}


				}
				squares[j].color = balls[i].color;

			}
		}

		ellipse(balls[i].x, balls[i].y, balls[i].width, balls[i].height);

		// balls[i].height -= 0.1;
		// balls[i].width -= 0.1;
		if (balls[i].height > windowHeight - 200 || balls[i].width > windowWidth - 200 || balls[i].height < 1 || balls[i].y > windowHeight) {
			balls.splice(i, 1);
		}
	}
}

function createBall(x, y) {
	let size = random(10, 40);
	ball =
	{
		height: size,
		width: size,
		x: x,
		y: y,
		xspeed: random(-1, 1),
		yspeed: random(-1, 1),
		color: color(random(0, 250), random(250, 255), random(0, 250))

	}
	balls.push(ball)
	//let playbackRate = map((mouseX + mouseY)/2, 0.01, width, 2, 0);
	let playbackRate = map((mouseX + mouseY) / 2.5, 0.01, width, 1.3, 0);
	playbackRate = constrain(playbackRate, 0.01, 4);

	// ding.rate(playbackRate);
	// ding.play();
}

function createSquare() {
	let h = random(30, 200);
	let w = random(30, 200);
	let x;
	let y;

	x = random(0, windowWidth);
	y = -h * 2;

	square =
	{
		height: h,
		width: w,
		x: x,
		y: y,
		xspeed: random(-.2, .2),
		yspeed: random(1, 2),
		color: color(255, random(0, 100), random(100, 200))
	}
	squares.push(square);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
