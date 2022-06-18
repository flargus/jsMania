let nDesnsity;
let scrollSpeed;
function setup() {
	createCanvas(windowWidth, windowHeight);
	nDesnsity = createSlider(100, 1000);
	nDesnsity.position(0, 0);
	scrollSpeed = createSlider(1, 12);
	scrollSpeed.position(0, 20);
	frameRate(60);
}

let lanes = [];
let lanePos = [];
let timer = 0;
let notes = [];
let notemap = [[], [], [], []];
let jCircle = [];
let kp = [false, false, false, false];
let tColor = (255, 0, 255);
let keys = [false, false, false, false];
let jColor = (255, 255, 255);

function draw() {
	resizeCanvas(windowWidth, windowHeight);
	let fps = frameRate();
	let foo = [];
	let bar = [];
	let vs = [];
	const tSize = windowWidth * 0.2;
	background(25, 25, 25);
	fill(255, 255, 255);
	rectMode(CENTER);
	translate(width / 2, height / 2);
	let track = rect(0, 0, tSize, height);
	x = -tSize / 4 - tSize / 8;
	for (let i = 0; i < 4; i++) {
		foo.push(rect(x, 0, tSize / 4, height));
		bar.push(x);
		if (keys[0] && i === 0) fill(255, 0, 0);
		if (keys[1] && i === 1) fill(255, 0, 0);
		if (keys[2] && i === 2) fill(255, 0, 0);
		if (keys[3] && i === 3) fill(255, 0, 0);

		vs.push(
			ellipse(
				x,
				300,
				windowWidth * 0.045,
				windowWidth * 0.045
			)
		);
		x += tSize / 4;
		fill(255, 255, 255);
	}
	fill(255, 255, 255);
	for (let collum of notemap) {
		for (let note of collum) {
			fill(0, 255, 255);
			ellipse(note.x, note.y, note.w, note.h);
			note.y += scrollSpeed.value();
			note.
		}
	}

	if (millis() >= nDesnsity.value() + timer) {
		fps = frameRate();
		dropCircle();
		timer = millis();
	}
	for (let i = 0; i < 4; i++) {
		kp[i] = false;
	}
	lanes = foo;
	lanePos = bar;
	jCircle = vs;
	text('FPS: ' + fps.toFixed(0), -450, -200);
	fill(255, 255, 255);
	text(
		'secs: ' + (millis() / 1000).toFixed(0),
		-450,
		-220
	);
}

function keyPressed() {
	if (key == 'd') {
		console.log(notemap[0]);
		let collum = notemap[0];
		if (jCircle[0].y - collum[collum.length - 1].y < 50) {
			collum[0].splice(collum[collum.length - 1]);
		}
		keys[0] = true;
	}
	if (key === 'f') keys[1] = true;
	if (key === 'j') keys[2] = true;
	if (key === 'k') keys[3] = true;
}

function keyReleased() {
	if (key === 'd') keys[0] = false;
	if (key === 'f') keys[1] = false;
	if (key === 'j') keys[2] = false;
	if (key === 'k') keys[3] = false;
}

function dropCircle() {
	let collum = Math.floor(random(0, 4));
	note = {
		x: lanePos[collum],
		y: -height / 2,
		w: windowWidth * 0.045,
		h: windowWidth * 0.045,
		color: (0, 225, 255)
	};
	notemap[collum].push(note);
}
