let nDesnsity;
let scrollSpeed;
let hitSound;
let keyImg;
let noteImg;
function preload() {
	keyImg = loadImage('assets/key.png');
	keyPress = loadImage('assets/keyPressed.png');
	note1 = loadImage('assets/note.png');
	note2 = loadImage('assets/note2.png');
	hitSound = loadSound('assets/normal-hitnormal.ogg');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	nDesnsity = createSlider(200, 1000);
	nDesnsity.position(0, 0);
	scrollSpeed = createSlider(1, 12);
	scrollSpeed.position(0, 30);
	frameRate(240);
	let font = loadFont('/assets/futuraBook.otf');
	textFont(font);
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
let ttHeight;

function draw() {
	//resize canvas on every update, in case of window size change
	resizeCanvas(windowWidth, windowHeight);
	debugMode();
	translate(0, 0);
	let fps = frameRate();
	let foo = [];
	let bar = [];
	let vs = [];
	let tHeight = windowHeight;
	ttHeight = tHeight;
	const tSize = windowWidth * 0.2;
	background(25, 25, 25);

	lights();

	fill(126, 126, 126);
	imageMode(CENTER);
	rectMode(CENTER);

	fill(0, 0, 0);
	x = -tSize / 4 - tSize / 8;
	fill(255);
	textSize(30);
	text('FPS: ' + fps.toFixed(0), -950, -325);
	text('secs: ' + (millis() / 1000).toFixed(0), -950, -200);
	text('hits:' + hits, -950, -175);
	text(combo, 0, -300);
	text('miss:' + misses, -950, -125);
	fill(0);
	strokeWeight(0);
	rotateX(1.25);
	//here, if the corresponding key is pressed, the image of a pressed key is shown
	//this is referred to as the judgement line
	for (let i = 0; i < 4; i++) {
		translate(0, 0, -25);
		foo.push(rect(x, 0, tSize / 4 + 10, tHeight + 2000));
		translate(0, 0, 25);
		translate(0, 0, -5);
		bar.push(x);
		if (keys[0] && i === 0) {
			if (rotationY != -0.25) {
				rotateY(-0.05);
			}
			image(keyPress, x, 375, width * 0.045, width * 0.045 * 1.92);
		}
		if (keys[1] && i === 1) {
			image(keyPress, x, 375, width * 0.045, width * 0.045 * 1.92);
			if (rotationY != -0.25) {
				rotateY(-0.025);
			}
		}
		if (keys[2] && i === 2) {
			image(keyPress, x, 375, width * 0.045, width * 0.045 * 1.92);
			if (rotationY != -0.25) {
				rotateY(0.05);
			}
		}
		if (keys[3] && i === 3) {
			image(keyPress, x, 375, width * 0.045, width * 0.045 * 1.92);
			if (rotationY != -0.25) {
				rotateY(0.025);
			}
		}

		x += tSize / 4;
		fill(0, 0, 0);
		translate(0, 0, 5);
	}

	// translate(0, 0, 15);
	// for (let judge of jCircle) image(judge);
	// translate(0, 0, -15);
	//the notes that have been spawned are controlled here
	fill(255, 255, 255);
	translate(0, 0, 5);
	rotateX(-0.025);
	for (let collum of notemap) {
		//draw all notes
		for (let note of collum) {
			fill(0, 255, 255);
			image(note.image, note.x, note.y, note.w, note.h);
		}
		//and here removes them if they are past the judgement line
		for (let i = 0; i < collum.length; i++) {
			if (collum[i].y >= 500) {
				collum.splice(i, 1);
				miss();
			}
		}
	}
	rotateX(0.025);
	translate(0, 0, -5);
	//this will spawn a note every *note density value*
	translate(0, 0, 20);
	if (millis() >= 1 + timer) {
		for (let collum of notemap)
			for (let note of collum) {
				note.y += scrollSpeed.value() ;
				note.set;
			}
	}
	if (millis() >= nDesnsity.value() + timer) {
		fps = frameRate();
		dropCircle();
		timer = millis();
	}
	translate(0, 0 - 20);
	lanes = foo;
	lanePos = bar;
	jCircle = vs;

	x = -tSize / 4 - tSize / 8;
	translate(0, 0, -20);
	//this will draw the keys at the bottom
	for (i = 0; i < 4; i++) {
		image(keyImg, x, 450, width * 0.05, width * 0.05 * 3);
		x += tSize / 4;
	}
	translate(0, 0, 20);
}
function hit(distance) {
	combo++;
	hits++;
}

function miss() {
	combo = 0;
	misses++;
}

function keyPressed() {
	if (key === 'd') handleKeyPress(0);
	if (key === 'f') handleKeyPress(1);
	if (key === 'j') handleKeyPress(2);
	if (key === 'k') handleKeyPress(3);
}

function handleKeyPress(key) {
	keys[key] = true;
	let collum = notemap[key];
	for (let i = 0; i < collum.length; i++) {
		let dist = 415 - collum[i].y;
		if (dist < 50) {
			hitSound.play();
			hit(dist);
			collum.splice(i, 1);
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
		y: -1400,
		w: windowWidth * 0.02 * 2.56,
		h: windowWidth * 0.02 * 1.88,
		color: (0, 225, 255)
	};
	notemap[collum].push(note);
}
