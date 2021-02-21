
var balls = [];
var squares = [];
var debrees = [];

var game_phase = 0;
var player_hp = 1;
var gun;
var spray_chance = 15;
var damage_modifier = 1;
var speed_modifier = 1;
var size_modifier = 1;
var decay_modifier = 1;
var spray_speed = 1;
var square_spawn = 200;
var notes = [];
var piano_notes = [];
var flute_notes = [];
var themes = [];
var bongo = []
var fadeAmount = 2;
var slingshot_startx;
var slingshot_starty;

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

	 piano_notes.push(loadSound('audio/high_a_piano.wav'));
	 piano_notes.push(loadSound('audio/high_b_piano.wav'));
	 piano_notes.push(loadSound('audio/high_c_piano.wav'));
	 piano_notes.push(loadSound('audio/high_d_piano.wav'));
	 piano_notes.push(loadSound('audio/high_e_piano.wav'));
	 piano_notes.push(loadSound('audio/high_f_piano.wav'));
	 piano_notes.push(loadSound('audio/high_g_piano.wav'));

	 flute_notes.push(loadSound('audio/A_flute.wav'));
	 flute_notes.push(loadSound('audio/B_flute.wav'));
	 flute_notes.push(loadSound('audio/C_flute.wav'));
	 flute_notes.push(loadSound('audio/D_flute.wav'));
	 flute_notes.push(loadSound('audio/E_flute.wav'));
	 flute_notes.push(loadSound('audio/F_flute.wav'));
	 flute_notes.push(loadSound('audio/G_flute.wav'));
	 flute_notes.push(loadSound('audio/high_a_flute.wav'));
	 flute_notes.push(loadSound('audio/high_b_flute.wav'));
	 flute_notes.push(loadSound('audio/high_c_flute.wav'));
	 flute_notes.push(loadSound('audio/high_d_flute.wav'));
	 flute_notes.push(loadSound('audio/high_e_flute.wav'));
	 flute_notes.push(loadSound('audio/high_f_flute.wav'));
	 flute_notes.push(loadSound('audio/high_g_flute.wav'));

	 bongo.push(loadSound('audio/bongo1.wav'));
	 bongo.push(loadSound('audio/bongo2.wav'));

	 themes.push(loadSound('audio/theme_string.wav'));
	 themes.push(loadSound('audio/theme_piano.wav'));
	 themes.push(loadSound('audio/theme_flute.wav'));
	
	 // ding = loadSound('audio/ding3.wav');
	 // hit = loadSound('audio/hit.wav');
	 // explode = loadSound('audio/explode2.wav');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	masterVolume(0.3);
	rectMode(CENTER);
	fade = 0;
	myFont = loadFont('MontereyFLF-Bold.ttf');
	textFont(myFont);

}

function reduce()
{
	square_spawn --;
	setTimeout(reduce,15000);
}

function draw() {

	background(255);


	if (game_phase == 0)
	{
	  if (!themes[0].isPlaying()) {
	      themes[0].play();
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
		fill(255, 204, 0, fade);
		textSize(30);
		text('click to start', width / 2, height / 2 );
		if (fade<0) fadeAmount=1; 
		fade += fadeAmount; 
		if (fade>255) fadeAmount=-10; 
		 
	}
	else if (game_phase == 1)
	{
		if (!themes[0].isPlaying()) {
	      themes[0].play();
	  	} 

		if (random(0, 200) > 10) {
			createSquare();
		}
		drawSquares();

	  	noStroke();
	  	textSize(70);
	  	fill(255, 204, 0);
		text('Click One', width / 2, 80 );

		stroke(255, 204, 0);
		fill(255, 42, 80)
		strokeWeight(9);
		rect(windowWidth*.2,windowHeight/2,400,600);
		rect(windowWidth*.5,windowHeight/2,400,600);
		rect(windowWidth*.8,windowHeight/2,400,600);
		fill(42, 230, 21);

		stroke(255, 204, 0);
		textSize(40);
		fill(255, 42, 80)
		strokeWeight(20);
		text('Updoot',windowWidth*.2, windowHeight/2 - 200 );
		text('Spray N Pray',windowWidth*.5, windowHeight/2 - 200 );
		text('Sling Shot',windowWidth*.8, windowHeight/2 - 200 );

		fill(255, 204, 0);
		textSize(18);
		noStroke();
		text('Click as fast as you can to fire balls',windowWidth*.2, windowHeight/2 + 80);
		text('Click and hold to fire at random',windowWidth*.5, windowHeight/2 + 80);
		text('Click and darg to fire a shot',windowWidth*.8, windowHeight/2 + 80);

	}
	else
	{

		if (random(0, 200) > square_spawn) {
			createSquare();
			//bongo[Math.floor(random(0, bongo.length))].play();
			
		}

		if (mouseIsPressed && gun == 'spray_n_pray') {

			createSprayBall();
		}

		drawSquares();
		drawDebree();
		drawBalls();

		if ( gun == "slingshot" && slingshot_startx != null)
		{
			stroke(255, 204, 0);
			strokeWeight(3);
			line(mouseX,mouseY, slingshot_startx,slingshot_starty);
		}


	}
}

function mousePressed()
{
	if (game_phase == 0)
	{
		piano_notes[0].play();
		piano_notes[2].play();

		game_phase = 1;
		//empty squares


	}
	else if (game_phase == 1)
	{


		if (mouseX > windowWidth*.2 - 400/2 &&
			mouseX < windowWidth*.2 + 400/2 && 
			mouseY > windowHeight/2 - 600/2 &&
			mouseY < windowHeight/2 + 600/2)
		{
			piano_notes[0].play();
			piano_notes[2].play();
			piano_notes[4].play();
			squares = [];
			themes[0].stop();
			setTimeout(reduce(),15000);
			gun = "updoot";
			game_phase = 2;

		}
		else if (mouseX > windowWidth*.5 - 400/2 &&
			mouseX < windowWidth*.5 + 400/2 && 
			mouseY > windowHeight/2 - 600/2 &&
			mouseY < windowHeight/2 + 600/2)
		{
			piano_notes[0].play();
			piano_notes[2].play();
			piano_notes[4].play();
			squares = [];
			themes[0].stop();
			setTimeout(reduce(),15000);
			gun = "spray_n_pray";
			game_phase = 2;
			
		}
		else if (mouseX > windowWidth*.8 - 400/2 &&
			mouseX < windowWidth*.8 + 400/2 && 
			mouseY > windowHeight/2 - 600/2 &&
			mouseY < windowHeight/2 + 600/2)
		{
			piano_notes[0].play();
			piano_notes[2].play();
			piano_notes[4].play();
			squares = [];
			themes[0].stop();
			setTimeout(reduce(),15000);
			gun = "slingshot";
			game_phase = 2;
			
		}
		
	}
	else if (game_phase == 2)
	{
		if (gun == "updoot")
		{
			//createUpBall();
			createUpBall();
		}
		else if (gun == "slingshot")
		{
			slingshot_startx = mouseX;
			slingshot_starty = mouseY;
			
		}	
	}
}

function mouseReleased()
{
	if (gun == "slingshot")
	{
		if ( Math.sqrt(Math.pow((slingshot_startx - mouseX), 2) + Math.pow((slingshot_starty - mouseY),2)) > 100 )
		{
			createSlingBall();
		}
		
		slingshot_startx = null;
		slingshot_starty = null;
	}
}


function createUpBall() {
	let size = random(10, 15);
	ball =
	{
		height: size,
		width: size,
		x: mouseX,
		y: mouseY,
		xspeed: random(-0.4, 0.4),
		yspeed: random(-10, -5),
		color: color(random(0, 200), random(250, 255), random(0, 200)),
		damage: 1 * damage_modifier,
		decay: 0.05

	}
	//notes[Math.floor(random(0, notes.length))].play();
	balls.push(ball);
}

function createSlingBall() {
	let size = random(40, 60);
	ball =
	{
		height: size,
		width: size,
		x: mouseX,
		y: mouseY,
		xspeed: ((slingshot_startx - mouseX)/windowWidth)*50,
		yspeed: ((slingshot_starty - mouseY)/windowWidth)*50,
		color: color(random(0, 200), random(250, 255), random(0, 200)),
		damage: 2 * damage_modifier,
		decay: 0.10

	}
	notes[Math.floor(random(0, notes.length))].play();
	balls.push(ball);

}

function createSprayBall() {
	if (random(1,100) < spray_chance)
	{

		let size = random(10, 40);
		ball =
		{
			height: size,
			width: size,
			x: mouseX,
			y: mouseY,
			xspeed: random(-5, 5),
			yspeed: random(-5, 5),
			color: color(random(0, 50), random(250, 255), random(100, 200)),
			damage: 1 * damage_modifier,
			decay: random(0.05, 0.5)

		}
		// let playbackRate = map((mouseX + mouseY) / 2.5, 0.01, width, 1.3, 0);
		// playbackRate = constrain(playbackRate, 0.01, 4);
		// var rand = Math.floor(random(0, notes.length -1));
		// notes[rand].rate(playbackRate);
		notes[Math.floor(random(0, notes.length))].play();
		balls.push(ball);
	}
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


function drawSquares()
{
	//draw squares
	for (let i = 0; i < squares.length; i++) {



		if (squares[i].x - squares[i].width / 2 < 0 || squares[i].x + squares[i].width/2 > width) {
			 squares[i].xspeed *= -1;
		}


		squares[i].x = squares[i].x + squares[i].xspeed;
		squares[i].y = squares[i].y + squares[i].yspeed;

				//remove squares that are off screen
		if (squares[i].y > windowHeight + squares[i].height/2) {
			console.log(squares[i].color);
			squares.splice(i, 1);
			i--;
			if(game_phase == 2)
			{

				bongo[Math.floor(random(0, bongo.length))].play();
				//alert("GAME OVER");
			}			
		}
		else
		{		
			fill(squares[i].color);
			noStroke();
			rect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
		}		
	}
}

function drawDebree()
{
	for (let i = 0; i < debrees.length; i++) {

		debrees[i].x = debrees[i].x + debrees[i].xspeed;
		debrees[i].y = debrees[i].y + debrees[i].yspeed;	

		fill(debrees[i].color);
		noStroke();

		rect(debrees[i].x, debrees[i].y, debrees[i].width, debrees[i].height);
		debrees[i].life --;
		debrees[i].height -= 0.2;
		debrees[i].width -= 0.2;
		
		//remove squares that are off screen
		if (debrees[i].width < 0) {
			debrees.splice(i, 1);
		}
	}
}

function drawBalls()
{

	for (let i = 0; i < balls.length; i++) {


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


					flute_notes[Math.floor(random(0, flute_notes.length))].play();
				}
				else
				{
					createDebree(squares[j].color, squares[j].x, squares[j].y, squares[j].width);
					//explode.rate(20/(balls[i].height/2));
					//explode.play();
					piano_notes[Math.floor(random(0, piano_notes.length))].play();
					flute_notes[Math.floor(random(0, flute_notes.length))].play();
					squares.splice(j, 1);
				}
				 balls[i].height /= 2;
		  		 balls[i].width /= 2;
			}
		}

		   balls[i].height -= balls[i].decay;
		   balls[i].width -= balls[i].decay;

		if (balls[i].height > windowHeight - 200 || balls[i].width > windowWidth - 200 || balls[i].height < 3 || balls[i].y > windowHeight) {
			balls.splice(i, 1);
			i--;
		}
		else
		{

		fill(balls[i].color);
		noStroke();
		ellipse(balls[i].x, balls[i].y, balls[i].width, balls[i].height);
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


