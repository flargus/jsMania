function drawTunnel() {
	pop();
	push();
	fill(0);
	translate(0, 0, 20);
	translate(0, tunnelOffset, -100);
	rotateY(0.4);
	tunnelOffset = tunnelOffset > stripH ? 0 : tunnelOffset + scrollSpeed.value() * delta * 5;
	heightRatio = (img.width * stripH) / img.height;
	ang = (-2 * PI) / res;
	imageMode(CORNER);
	heightRatio = (img.width * stripH) / img.height;
	ang = (-2 * PI) / res;
	sectionLength = 1500;
	translate(0, (-(rows - 1) * stripH) / 2);
	texture(img);
	beginShape(TRIANGLE_STRIP);
	for (var j = 0; j < rows; j++) {
		beginShape(TRIANGLE_STRIP);
		for (var i = 0; i <= res; i++) {
			var x = cos(i * ang) * radius;
			var z = sin(i * ang) * radius;
			var y = j * stripH;
			var yBottom = (j + 1) * stripH;
			var u = map(i * sectionLength + j, 0, heightRatio, 0, 1);
			vertex(x, y, z, u, 0);
			vertex(x, yBottom, z, u, 1);
		}
		endShape();
	}
	pop();
	logic();
	hud();
	pop();
}
