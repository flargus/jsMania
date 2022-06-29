function hud() {
	translate(100, 100, 0);
	rotateX(-1.25);
	fill(255);
	textSize(30);
	text('FPS: ' + fps, -950, -325);
	text('millis ' + seconds, -950, -275);
	text('secs: ' + (millis() / 1000).toFixed(0), -950, -200);
	text('hits:' + hits, -950, -175);
	text(combo, -110, -300);
	text('miss:' + misses, -950, -125);

	translate(0, 0, 400);
	rotateX(1.25);
	text(' D    F    J    K', -200, 170);
	rotateX(-1.25);
	timer = millis();
	push();
	translate(-120, -1850, -6000);
	rotateY(millis());
	texture(flash);
	sphere(600, 12, 12);
	//image(flash, 0, 0);
}
