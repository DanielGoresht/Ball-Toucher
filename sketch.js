
var balls = [];

function preload() {
	song = loadSound('/ding.mp4');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  song.loop();
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    createBall(mouseX,mouseY);
  }
  	for (let i=0; i < balls.length; i++)
  	{
		fill(balls[i].color);
		noStroke();
		balls[i].x = balls[i].x + balls[i].xspeed;

		if (balls[i].x > width)
		{
			balls[i].x = width;
			balls[i].xspeed *= -1;
		}
		if (balls[i].x <= 0)
		{
			balls[i].x = 0;
			balls[i].xspeed *= -1;
		}
		balls[i].y =balls[i].y + balls[i].yspeed;
		if (balls[i].y > height)
		{
			balls[i].y = height;
			balls[i].yspeed *= -1;
		}
		if (balls[i].y <= 0)
		{
			balls[i].y = 5;
			balls[i].yspeed *= -1;
		}

  		ellipse( balls[i].x,balls[i].y, balls[i].height, balls[i].width);
  	}  
}

function createBall(x,y)
{
	let size = random(10,35);
	ball = 
	  {
	  	height: size,
	  	width: size,
	  	x: x,
	  	y: y,
	  	xspeed: random(-5,5),
	  	yspeed: random(-5,5),
	  	color: color(random(0,255), random(255,255), random(0,255))

	  }
	balls.push(ball)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
