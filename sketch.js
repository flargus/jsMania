function setup() {
	createCanvas(windowWidth, windowHeight);
}

let lanes = [];
let lanePos = [];
let timer = 0;
let notes = [];
let jCircle = [];
let kp = [false, false, false, false];
let tColor = (255, 0, 255);
let jColor = (255, 255, 255)

function draw() {
	resizeCanvas(windowWidth, windowHeight);
	let foo = [];
	let bar = [];
	let vs = [];
	const tSize = windowWidth * 0.2;
	background(25, 25, 25);
	rectMode(CENTER);
	translate(width / 2, height / 2);
	let track = rect(0, 0, tSize, height);
	x = -tSize / 4 - tSize / 8;
	for (let i = 0; i < 4; i++) {
		foo.push(rect(x, 0, tSize / 4, height));
		bar.push(x);
		if(kp[i]){
			fill(jColor)
		}
		vs.push(
			ellipse(
				x,
				300,
				windowWidth * 0.045,
				windowWidth * 0.045
			)
		);
		x += tSize / 4;
		fill(jColor)
	}

	for (let note of notes) {
		push();
		fill(0, 255, 255);
		ellipse(note.x, note.y, note.w, note.h);
		note.y += 25;
		pop();
	}
	if (millis() >= 500 + timer) {
		dropCircle();
		timer = millis();
	}
	for (let i = 0; i < 4; i++) {
		kp[i] = false;
	}

	lanes = foo;
	lanePos = bar;
	jCircle = vs;
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
