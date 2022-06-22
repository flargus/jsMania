let nDesnsity;
let scrollSpeed;
let hitSound;
let keyImg;
let noteImg;
let sliderTop;
let sliderMid;
let sliderTail;
function preload() {
	keyImg = loadImage('assets/key.png');
	keyPress = loadImage('assets/keyPressed.png');
	note1 = loadImage('assets/note.png');
	note2 = loadImage('assets/note2.png');
	hitSound = loadSound('assets/normal-hitnormal.ogg');
	sliderTop = loadImage('assets/sliderTop.png');
	sliderMid = loadImage('assets/sliderMid.png');
	sliderTail = loadImage('assets/sliderTail.png');
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

let lates = [];
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
let rotateFrame = false;

function draw() {
	//resize canvas on every update, in case of window size change
	resizeCanvas(windowWidth, windowHeight);
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
		for (let j = 0; j < 4; j++) {
			if (keys[j] && i == j) {
				image(keyPress, x, 375, width * 0.045, width * 0.045 * 1.92);
			}
		}

		x += tSize / 4;
		fill(0, 0, 0);
		translate(0, 0, 5);
	}
	translate(0, 0, 5);
	for (let i = 0; i < 4; i++) {
		if (keys[i]) {
			rotateFrame = true;
			switch (i) {
				case 0:
					rotateY(-0.02);
					break;
				case 1:
					rotateY(-0.01);
					break;
				case 2:
					rotateY(0.01);
					break;
				case 3:
					rotateY(0.02);
					break;
			}
		}
	}
	// translate(0, 0, 15);
	// for (let judge of jCircle) image(judge);
	// translate(0, 0, -15);
	//the notes that have been spawned are controlled here
	fill(255, 255, 255);
	translate(0, 0, 5);
	rotateX(-0.025);
	for (let column of notemap) {
		//draw all notes
		for (let note of column) {
			fill(0, 255, 255);
			switch (note.type) {
				case 'note':
					image(note.image, note.x, note.y, note.w, note.h);
					break;
				case 'slider':
					image(note.image, note.x, note.y, note.w, note.h);
					image(sliderMid, note.x, note.y - note.length / 2, note.w, note.length);
					image(sliderTail, note.x, note.y - note.length, note.w, note.h);
				// if (note.length > 0) {
				// 	note.midOffset -= width * 0.02 * 0.86;
				// 	note.length -= 86;
				// 	midSlider(note.x, note.y + note.midOffset, note.col);
				// } else {
				// 	tailSlider(note.x, note.y + note.midOffset, note.col);
				// }
				// break;
				case 'section':
					image(note.image, note.x, note.y, note.w, note.h);
					break;
				case 'tail':
					rotateZ(90);
					image(note.image, note.x, note.y, note.w, note.h);
					rotateZ(-90);
			}
		}
		//and here removes them if they are past the judgement line
		for (let i = 0; i < column.length; i++) {
			if (column[i].y >= 600) {
				if (column[i].type === 'note' || column[i].type === 'tail') {
					lates.push(column[i]);
					column.splice(i, 1);
				}
				if (column[i].type === 'note' || column[i].type === 'slider') miss();
			}
		}
	}
	rotateX(0.025);
	translate(0, 0, -5);
	//this will spawn a note every *note density value*
	translate(0, 0, 20);
	if (millis() >= 1 + timer) {
		for (let column of notemap)
			for (let note of column) {
				note.y += scrollSpeed.value();
				note.set;
			}
	}
	if (millis() >= nDesnsity.value() + timer) {
		fps = frameRate();
		//dropCircle();
		timer = millis();
	}
	if (lates.length > 30) {
		lates.pop();
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
	rotateX(-1.25);
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
	switch (key) {
		case 'd':
			handleKeyPress(0);
			break;
		case 'f':
			handleKeyPress(1);
			break;
		case 'j':
			handleKeyPress(2);
			break;
		case 'k':
			handleKeyPress(3);
			break;
		case 'v':
			dropSlider();
	}
}

function handleKeyPress(key) {
	keys[key] = true;
	let column = notemap[key];
	for (let i = 0; i < column.length; i++) {
		let dist = 400 - column[i].y;
		if (dist < 100) {
			hitSound.play();
			hit(dist);
			column.splice(i, 1);
		}
	}
}

function keyReleased() {
	switch (key) {
		case 'd':
			keys[0] = false;
			break;
		case 'f':
			keys[1] = false;
			break;
		case 'j':
			keys[2] = false;
			break;
		case 'k':
			keys[3] = false;
			break;
	}
}

function dropCircle() {
	let column = Math.floor(random(0, 4));
	//define the position of the note, this is added to the notemap and subsequently used in draw()
	note = {
		type: 'note',
		image: column === 1 || column === 2 ? note2 : note1,
		x: lanePos[column],
		y: -1400,
		w: windowWidth * 0.02 * 2.56,
		h: windowWidth * 0.02 * 1.88,
		color: (0, 225, 255)
	};
	notemap[column].push(note);
}

function dropSlider() {
	let column = Math.floor(random(0, 4));
	slider = {
		type: 'slider',
		image: sliderTop,
		x: lanePos[column],
		y: -1400,
		w: windowWidth * 0.02 * 2.56,
		h: windowWidth * 0.02 * 1.88,
		length: 500,
		midOffset: 0,
		col: column
	};
	notemap[column].push(slider);
}

function midSlider(xPos, yPos, column) {
	section = {
		type: 'section',
		image: sliderMid,
		x: xPos,
		y: yPos,
		w: windowWidth * 0.02 * 2.56,
		h: windowWidth * 0.02 * 0.82
	};
	notemap[column].push(section);
}

function tailSlider(xPos, yPos, column) {
	tail = {
		type: 'tail',
		image: sliderTail,
		x: xPos,
		y: yPos,
		w: windowWidth * 0.02 * 2.56,
		h: windowWidth * 0.02 * 1.88
	};
	notemap[column].push(section);
}
