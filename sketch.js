
var balls = [];
var squares = [];

function preload() {
	ding = loadSound('ding.mp3');
	key = loadSound('key.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  masterVolume(0.3);
}

function draw() {
  background(255);
  key.rate(.8);

   if (random(0,100) > 1)
   {
   	createSquare();
   }

  if (mouseIsPressed) {
    createBall(mouseX,mouseY);
  }

    	for (let i=0; i < squares.length; i++)
  	{
  		fill(squares[i].color);
		noStroke();
		squares[i].x = squares[i].x + squares[i].xspeed;
		squares[i].y = squares[i].y + squares[i].yspeed;


		rect( squares[i].x,squares[i].y, squares[i].height, squares[i].width);
  	}

  	for (let i=0; i < balls.length; i++)
  	{
		fill(balls[i].color);
		noStroke();
		balls[i].x = balls[i].x + balls[i].xspeed;
		
		if (balls[i].x + balls[i].width/2 > width)
		{
			balls[i].x = width - balls[i].width/2;
			balls[i].xspeed *= -1;
			key.play();
		}
		if (balls[i].x <= balls[i].width/2)
		{
			balls[i].x = balls[i].width/2;
			balls[i].xspeed *= -1;
			key.play();
		}
		balls[i].y = balls[i].y + balls[i].yspeed;

		if (balls[i].y + balls[i].height/2 > height)
		{
			balls[i].y = height - balls[i].height/2;
			balls[i].yspeed *= -1;
			key.play();
		}
		if (balls[i].y <= balls[i].height/2)
		{
			balls[i].y = balls[i].height/2;
			balls[i].yspeed *= -1
			key.play();
		}

  		ellipse( balls[i].x,balls[i].y, balls[i].height, balls[i].width);
  
 	 		balls[i].height -= 0.1;
  		balls[i].width -= 0.1;
  		if (balls[i].height > windowHeight-200 || balls[i].width > windowWidth - 200 || balls[i].height < 1)
  		{
  			balls.splice(i, 1);
  			
  		}
  	}  
}

function createBall(x,y)
{
	let size = random(10,40);
	ball = 
	  {
	  	height: size,
	  	width: size,
	  	x: x,
	  	y: y,
	  	xspeed: random(-5,5),
	  	yspeed: random(-5,5),
	  	color: color(random(0,200), random(255,255), random(0,200))

	  }
	balls.push(ball)
	//let playbackRate = map((mouseX + mouseY)/2, 0.01, width, 2, 0);
	let playbackRate = map((mouseX + mouseY)/2.5, 0.01, width, 1.3, 0);
  	playbackRate = constrain(playbackRate, 0.01, 4);

    ding.rate(playbackRate);
	ding.play();
}

function createSquare()
{
	let wall = random(1,4);
	wall = Math.round(wall);

	let h = random(30,200);
	let w = random(30,200);
	let x;
	let y;
	if (wall == 1)
	{
			console.log(wall);
		x = - w;
		y = random(0, windowHeight);
	}
	else if (wall == 2)
	{
		x = random(0, windowWidth);
		y = windowHeight + h;
	}
	else if (wall == 3)
	{
		x = windowWidth + w;
		y = random(0,windowHeight);
	}
	else if (wall = 4)
	{
		x = random(0, windowWidth);
		y = -h*2;
	}
		square = 
	  {
	  	height: h,
	  	width: w,
	  	x: x,
	  	y: y,
	  	xspeed: random(-3,3),
	  	yspeed: random(-3,3),
	  	color: color(255, random(0,100),random(100,200))
	  }
	  squares.push(square);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
