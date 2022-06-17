function setup() {
	createCanvas(windowWidth, windowHeight);
}

let lanes = [];
let lanePos = [];
let timer = 0;
let notes = [];
let jCircle = [];

function draw() {
	resizeCanvas(windowWidth, windowHeight);
	let foo = [];
	let bar = [];
	let vs = [];
	const tSize = windowWidth * 0.2;
	background(220);
	rectMode(CENTER);
	fill(200, 255, 200);
	translate(width / 2, height / 2);
	let track = rect(0, 0, tSize, height);
	x = -tSize / 4 - tSize / 8;
	for (let i = 0; i < 4; i++) {
		fill(255, 255, 255);
		foo.push(rect(x, 0, tSize / 4, height));
		bar.push(x);
		vs.push(
			ellipse(
				x,
				300,
				windowWidth * 0.045,
				windowWidth * 0.045
			)
		);
		x += tSize / 4;
	}
	lanes = foo;
	lanePos = bar;
	jCircle = vs;
	for (let note of notes) {
		push();
		fill(0, 255, 255);
		ellipse(note.x, note.y, note.w, note.h);
		note.y += 25;
		pop();
	}
	if (millis() >= 1000 + timer) {
		dropCircle();
		timer = millis();
	}
}

function dropCircle() {
	note = {
		x: lanePos[Math.floor(random(0, 4))],
		y: -height / 2,
		w: windowWidth * 0.045,
		h: windowWidth * 0.045,
		color: (0, 225, 255)
	};
	notes.push(note);
}
