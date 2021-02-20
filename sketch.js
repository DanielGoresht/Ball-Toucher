
var balls = [];
var squares = [];

var player_hp = 1;
var damage_modifier = 1;
var speed_modifier = 1;
var size_modifier = 1;
var decay_modifier = 1;
var spray_speed = 1;

function preload() {
	 ding = loadSound('ding.mp3');
	 hit = loadSound('hit.wav');
	 explode = loadSound('explode2.wav');

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	masterVolume(0.3);
	rectMode(CENTER);

	//ps = new ParticleSystem(200, 100, 10);
}

function draw() {

	background(255);
	//ps.display();
	//ps.update();
	

	if (random(0, 100) > 99) {
		createSquare();
	}

	if (mouseIsPressed) {
		createBall();
		//ps.shatter();

	}

	for (let i = 0; i < squares.length; i++) {
		fill(squares[i].color);
		noStroke();
		squares[i].x = squares[i].x + squares[i].xspeed;
		squares[i].y = squares[i].y + squares[i].yspeed;

		rect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
		//remove squares that are off screen
		if (squares[i].y > windowHeight + 200) {
			squares.splice(i, 1);
			//alert("GAME OVER");
		}

		
	}

	for (let i = 0; i < balls.length; i++) {

		fill(balls[i].color);
		noStroke();
		balls[i].x = balls[i].x + balls[i].xspeed;
		//bounce.rate(12/balls[i].height);
		//check for hitting walls
		if (balls[i].x + balls[i].width / 2 > width) {
			balls[i].x = width - balls[i].width / 2;
			balls[i].xspeed *= -1;
		}
		if (balls[i].x <= balls[i].width / 2) {
			balls[i].x = balls[i].width / 2;
			balls[i].xspeed *= -1;
		}
		balls[i].y = balls[i].y + balls[i].yspeed;

		if (balls[i].y + balls[i].height / 2 > height) {
			balls[i].y = height - balls[i].height / 2;
			balls[i].yspeed *= -1;
		}
		if (balls[i].y <= balls[i].height / 2) {
			balls[i].y = balls[i].height / 2;
			balls[i].yspeed *= -1
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
				squares[j].hp -= balls[i].damage;
				if (squares[j].hp > 0)
				{
					squares[j].color = color(255, random(((4-squares[j].hp)*50)- 33, (4-squares[j].hp)*50), (4-squares[j].hp)*60);
					hit.rate(10/balls[i].height);
					hit.play();
				}
				else
				{
					explode.rate(20/(balls[i].height/2));
					explode.play();
					squares.splice(j, 1);
				}
			}
		}


		ellipse(balls[i].x, balls[i].y, balls[i].width, balls[i].height);
		 // balls[i].height -= 0.2;
		 // balls[i].width -= 0.2;

		if (balls[i].height > windowHeight - 200 || balls[i].width > windowWidth - 200 || balls[i].height < 1 || balls[i].y > windowHeight) {
			balls.splice(i, 1);
		}
	}
}

function createBall() {
	let size = random(10, 40);
	ball =
	{
		height: size,
		width: size,
		x: mouseX,
		y: mouseY,
		xspeed: random(-5, 5),
		yspeed: random(-5, 5),
		color: color(random(0, 200), random(250, 255), random(0, 200)),
		damage: 1 * damage_modifier

	}
	balls.push(ball)
	//let playbackRate = map((mouseX + mouseY)/2, 0.01, width, 2, 0);
	let playbackRate = map((mouseX + mouseY) / 2.5, 0.01, width, 1.3, 0);
	playbackRate = constrain(playbackRate, 0.01, 4);

	 ding.rate(playbackRate);
	 ding.play();
}

function createSquare() {
	let h = random(30, 200);
	let w = random(30, 200);
	let x;
	let y;

	x = random(0, windowWidth);
	y = -h * 2;
	let hp = Math.floor(random(1,5));


	square =
	{
		height: h,
		width: w,
		x: x,
		y: y,
		xspeed: random(-.2, .2),
		yspeed: random(1, 2),
		color: color(255, random(((4-hp)*33)- 33, (4-hp)*33), (4-hp)*60),
		hp: hp
	}
	squares.push(square);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}



// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Using Generics now!  comment and annotate, etc.

class ParticleSystem {


	constructor(x, y, r) {
	  this.particles = [];
	  // this.intact = true;
	  let rows = 10;
	  let cols = 10;
	  for (let i = 0; i < rows * cols; i++) {
		this.addParticle(x + (i % cols) * r, y + (floor(i / rows)) * r, r);
	  }
	}
  
	addParticle(x, y, r) {
	  this.particles.push(new Particle(x, y, r));
	}
  
	display() {
	  for (let particle of this.particles) {
		particle.display();
	  }
	}
  
	shatter() {
	  for (let particle of this.particles) {
		let force = p5.Vector.random2D();
		force.mult(10);
		particle.applyForce(force);
	  }
	  // this.intact = false;
	}
  
	update() {
	  for (let particle of this.particles) {
		particle.update();
	  }
	}
  }



// shatter

class Particle {

	constructor(x, y, r) {
	  this.acceleration = createVector();
	  this.velocity = createVector()
	  this.velocity.mult(0.5);
	  this.position = createVector(x, y);
	  this.lifespan = 255.0;
	  this.r = r;
	}
  
	run() {
	  this.update();
	  this.display();
	}
  
	applyForce(force) {
	  this.acceleration.add(force);
	}
  
	// Method to update position
	update() {
	  this.velocity.add(this.acceleration);
	  this.position.add(this.velocity);
	  this.acceleration.mult(0);
	  this.velocity.mult(0.95);
	  this.lifespan -= 2.0;
	}
  
	// Method to display
	display() {
	  stroke(0);
	  fill(0);
	  rectMode(CENTER);
	  rect(this.position.x, this.position.y, this.r, this.r);
	}
  
	// Is the particle still useful?
	isDead() {
	  if (this.lifespan < 0.0) {
		return true;
	  } else {
		return false;
	  }
	}
  }
