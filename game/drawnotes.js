function drawNotes() {
	rotateX(0.025);
	translate(0, 0, -5);
	x = -tSize / 4 - tSize / 8;

	//this will draw the keys at the bottom
	for (i = 0; i < 4; i++) {
		image(keyImg, x, 450, width * 0.05, width * 0.05 * 3);
		x += tSize / 4;
	}
	translate(0, 0 - 40);
}
