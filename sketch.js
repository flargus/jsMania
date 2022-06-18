let nDesnsity;
let scrollSpeed;
let keyImg;
let noteImg;
function setup() {
	createCanvas(windowWidth, windowHeight);
	nDesnsity = createSlider(100, 1000);
	nDesnsity.position(0, 0);
	scrollSpeed = createSlider(1, 12);
	scrollSpeed.position(0, 20);
	frameRate(240);
	keyImg = loadImage('assets/key.png');
	keyPress = loadImage('assets/keyPressed.png');
	note1 = loadImage('assets/note.png');
	note2 = loadImage('assets/note2.png');
	noteImgs = [note1, note2];
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

let hits = 0;
let combo = 0;
let misses = 0;

function draw() {
	//resize canvas on every update, in case of window size change
	resizeCanvas(windowWidth, windowHeight);
	let fps = frameRate();
	let foo = [];
	let bar = [];
	let vs = [];
	const tSize = windowWidth * 0.2;
	background(25, 25, 25);
	fill(126, 126, 126);
	imageMode(CENTER);
	rectMode(CENTER);
	translate(width / 2, height / 2);
	let track = rect(0, 0, tSize + 10, height);
	fill(0, 0, 0);
	x = -tSize / 4 - tSize / 8;

	for (let judge of jCircle) image(judge);

	//here, if the corresponding key is pressed, the image of a pressed key is shown
	//this is referred to as the judgement line
	for (let i = 0; i < 4; i++) {
		foo.push(rect(x, 0, tSize / 4, height));
		bar.push(x);
		if (keys[0] && i === 0)
			image(keyPress, x, 302, width * 0.045, width * 0.045 * 1.92);
		if (keys[1] && i === 1)
			image(keyPress, x, 302, width * 0.045, width * 0.045 * 1.92);
		if (keys[2] && i === 2)
			image(keyPress, x, 302, width * 0.045, width * 0.045 * 1.92);
		if (keys[3] && i === 3)
			image(keyPress, x, 302, width * 0.045, width * 0.045 * 1.92);

		x += tSize / 4;
		fill(0, 0, 0);
	}

	//the notes that have been spawned are controlled here
	fill(255, 255, 255);
	for (let collum of notemap) {
		//draw all notes
		for (let note of collum) {
			fill(0, 255, 255);
			image(note.image, note.x, note.y, note.w, note.h);
		}
		//and here removes them if they are past the judgement line
		for (let i = 0; i < collum.length; i++) {
			if (collum[i].y >= 400) collum.splice(i, 1);
		}
	}
	//this will spawn a note every *note density value*

	if (millis() >= 1 + timer) {
		for (let collum of notemap)
			for (let note of collum) {
				note.y += scrollSpeed.value() / 3;
			}
	}
	if (millis() >= nDesnsity.value() + timer) {
		fps = frameRate();
		dropCircle();
		timer = millis();
	}

	lanes = foo;
	lanePos = bar;
	jCircle = vs;
	text('FPS: ' + fps.toFixed(0), -950, -325);
	fill(255, 255, 255);
	text('secs: ' + (millis() / 1000).toFixed(0), -950, -350);
	text('hits:' + hits, -950, -300);
	text('combo:' + combo, -950, -275);
	text('miss:' + misses, -950, -250);
	x = -tSize / 4 - tSize / 8;

	//this will draw the keys at the bottom
	for (i = 0; i < 4; i++) {
		image(keyImg, x, 350, width * 0.05, width * 0.05 * 3);
		x += tSize / 4;
	}
}
function hit(distance) {
	combo++;
	hits++;
}

function keyPressed() {
	if (key == 'd') {
		keys[0] = true;
		let collum = notemap[0];
		for (let i = 0; i < collum.length; i++) {
			let dist = 302 - collum[i].y;
			if (dist < 50) {
				hit(dist)
				collum.splice(i, 1);
			}
		}
	}
	if (key == 'f') {
		keys[1] = true;
		let collum = notemap[1];
		for (let i = 0; i < collum.length; i++) {
			let dist = 302 - collum[i].y;
			if (dist < 50) {
				hit(dist)
				collum.splice(i, 1);
			}
		}
	}
	if (key == 'j') {
		keys[2] = true;
		let collum = notemap[2];
		for (let i = 0; i < collum.length; i++) {
			let dist = 302 - collum[i].y;
			if (dist < 50) {
				hit(dist)
				collum.splice(i, 1);
			}
		}
	}
	if (key == 'k') {
		keys[3] = true;
		let collum = notemap[3];
		for (let i = 0; i < collum.length; i++) {
			let dist = 302 - collum[i].y;
			if (dist < 50) {
				hit(dist)
				collum.splice(i, 1);
			}
		}
	}

}

function keyReleased() {
	if (key === 'd') keys[0] = false;
	if (key === 'f') keys[1] = false;
	if (key === 'j') keys[2] = false;
	if (key === 'k') keys[3] = false;
}

function dropCircle() {
	let collum = Math.floor(random(0, 4));
	//define the position of the note, this is added to the notemap and subsequently used in draw()
	note = {
		image: collum === 1 || collum === 2 ? note2 : note1,
		x: lanePos[collum],
		y: -height / 2,
		w: windowWidth * 0.02 * 2.56,
		h: windowWidth * 0.02 * 1.88,
		color: (0, 225, 255)
	};
	notemap[collum].push(note);
}
