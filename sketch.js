
var balls = [];
var squares = [];
var debrees = [];

var start = false;
var player_hp = 1;
var gun;
var damage_modifier = 1;
var speed_modifier = 1;
var size_modifier = 1;
var decay_modifier = 1;
var spray_speed = 1;
var square_spawn = 200;
var notes = [];
var wind_notes = [];
var bongo = []
var fadeAmount = 2;

var fade = -10;

function preload() {
	 notes.push(loadSound('audio/A.wav'));
	 notes.push(loadSound('audio/B.wav'));
	 notes.push(loadSound('audio/C.wav'));
	 notes.push(loadSound('audio/D.wav'));
	 notes.push(loadSound('audio/E.wav'));
	 notes.push(loadSound('audio/F.wav'));
	 notes.push(loadSound('audio/G.wav'));
	 notes.push(loadSound('audio/high_a.wav'));
	 notes.push(loadSound('audio/high_b.wav'));
	 notes.push(loadSound('audio/high_c.wav'));
	 notes.push(loadSound('audio/high_d.wav'));
	 notes.push(loadSound('audio/high_e.wav'));
	 notes.push(loadSound('audio/high_f.wav'));
	 notes.push(loadSound('audio/high_g.wav'));

	 wind_notes.push(loadSound('audio/wind_B.wav'));
	 wind_notes.push(loadSound('audio/wind_E.wav'));
	 wind_notes.push(loadSound('audio/wind_G.wav'));
	 wind_notes.push(loadSound('audio/wind_c.wav'));
	 wind_notes.push(loadSound('audio/wind_f.wav'));

	 bongo.push(loadSound('audio/bongo1.wav'));
	 bongo.push(loadSound('audio/bongo2.wav'));

	 title = loadSound('audio/title.wav');
	
	 // ding = loadSound('audio/ding3.wav');
	 // hit = loadSound('audio/hit.wav');
	 // explode = loadSound('audio/explode2.wav');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	masterVolume(0.3);
	rectMode(CENTER);
	fade = 0
}

function reduce()
{
	square_spawn --;
	setTimeout(reduce,15000);
}

function draw() {

	background(255);


	if (start == false)
	{
	  if (!title.isPlaying()) {
	      title.play();
	  } 

		if (random(0, 200) > 10) {
			createSquare();
		}
		drawSquares();

		textAlign(CENTER);
		textSize(70);
		textStyle(BOLD);
		fill(42, 230, 21);
		text('Ball Toucher', windowWidth / 2, windowHeight / 2 - 70);
		fill(0, 254, 25, fade);
		textSize(30);
		text('click to start', width / 2, height / 2 );
		if (fade<0) fadeAmount=1; 
		fade += fadeAmount; 
		if (fade>255) fadeAmount=-10; 
		 
	}
	else
	{

		if (random(0, 200) > square_spawn) {
			createSquare();
			//bongo[Math.floor(random(0, bongo.length))].play();
			
		}

		// if (mouseIsPressed) {

		// 	createSprayBall();
		// }
		//draw squares
		drawSquares();
		//draw debree
		for (let i = 0; i < debrees.length; i++) {

			fill(debrees[i].color);
			noStroke();
			debrees[i].x = debrees[i].x + debrees[i].xspeed;
			debrees[i].y = debrees[i].y + debrees[i].yspeed;

			rect(debrees[i].x, debrees[i].y, debrees[i].width, debrees[i].height);
			debrees[i].life --;
			debrees[i].height -= 0.2;
			debrees[i].width -= 0.2;
			
			//remove squares that are off screen
			if (debrees[i].width < 0) {
				debrees.splice(i, 1);
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
				// bongo[Math.floor(random(0, bongo.length))].play();

			}
			if (balls[i].x <= balls[i].width / 2) {
				balls[i].x = balls[i].width / 2;
				balls[i].xspeed *= -1;
				// bongo[Math.floor(random(0, bongo.length))].play();
			}
			balls[i].y = balls[i].y + balls[i].yspeed;

			if (balls[i].y + balls[i].height / 2 > height) {
				balls[i].y = height - balls[i].height / 2;
				balls[i].yspeed *= -1;
				// bongo[Math.floor(random(0, bongo.length))].play();
			}
			if (balls[i].y <= balls[i].height / 2) {
				balls[i].y = balls[i].height / 2;
				balls[i].yspeed *= -1
				// bongo[Math.floor(random(0, bongo.length))].play();
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

						 //hit.rate(10/balls[i].height);

						notes[Math.floor(random(0, notes.length))].play();
					}
					else
					{
						createDebree(squares[j].color, squares[j].x, squares[j].y, squares[j].width);
						//explode.rate(20/(balls[i].height/2));
						//explode.play();
						wind_notes[Math.floor(random(0, wind_notes.length))].play();
						squares.splice(j, 1);
					}
					 balls[i].height /= 2;
			  		 balls[i].width /= 2;
				}
			}


			ellipse(balls[i].x, balls[i].y, balls[i].width, balls[i].height);
			   balls[i].height -= 0.05;
			   balls[i].width -= 0.05;

			if (balls[i].height > windowHeight - 200 || balls[i].width > windowWidth - 200 || balls[i].height < 1 || balls[i].y > windowHeight) {
				balls.splice(i, 1);
			}
		}
	}
}

function createSprayBall() {
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
	// let playbackRate = map((mouseX + mouseY) / 2.5, 0.01, width, 1.3, 0);
	// playbackRate = constrain(playbackRate, 0.01, 4);
	// var rand = Math.floor(random(0, notes.length -1));
	// notes[rand].rate(playbackRate);
	notes[Math.floor(random(0, notes.length))].play();
	balls.push(ball);

}

function createSquare() {
	let h = random(30, 200);
	let w = random(30, 200);
	let x;
	let y;

	x = random(0, windowWidth);
	y = -h+10;
	let hp = Math.floor(random(1,5));


	square =
	{
		height: h,
		width: w,
		x: x,
		y: y,
		xspeed: random(-.2, .2),
		yspeed: random(1, 1.5),
		color: color(255, random(((4-hp)*33)- 33, (4-hp)*33), (4-hp)*60),
		hp: hp
	}
	squares.push(square);
}

function createDebree(p_color, p_x, p_y, width)
{

	for (let i = 40; i > 0; i --)
	{
		let xs = random(-5, 5);
		debree =
		{
			width: width/10,
			height: width/10,
			x: p_x + i,
			y: p_y + i,
			xspeed: xs,
			yspeed: random(-5, 5),
			color: color(255, random(100,200), random(200,255))

		}

	debrees.push(debree)

	}
}

function mousePressed()
{
	if (start == false)
	{

		start = true;
		//empty squares
		squares = [];
		setTimeout(reduce(),15000);

	}
	else
	{
		createSprayBall();
	}
	
}

function drawSquares()
{
	//draw squares
	for (let i = 0; i < squares.length; i++) {
		if (squares[i].x - squares[i].width / 2 < 0 || squares[i].x + squares[i].width/2 > width) {
			 squares[i].xspeed *= -1;
		}

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
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


