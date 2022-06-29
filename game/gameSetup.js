function gameSetup() {
	//resize canvas on every update, in case of window size change
	resizeCanvas(windowWidth, windowHeight);
	fps = frameRate();

	tHeight = windowHeight;
	ttHeight = tHeight;
	tSize = windowWidth * 0.2;
	background(0);

	lights();
	delta = (millis() - timer) / 1000;
	fill(126, 126, 126);
	imageMode(CENTER);
	rectMode(CENTER);
	fill(0, 0, 0);
	x = -tSize / 4 - tSize / 8;

	fill(100);
	strokeWeight(0);
	rotateX(1.25);

	fill(0);
	lights();
}
