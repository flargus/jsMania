let nDesnsity;
let scrollSpeed;
let hitSound;
let keyImg;
let noteImg;
let sliderTop;
let sliderMid;
let sliderTail;
let wallTexture;

var rows = 15;
var img;
var res = 8;
var radius = 1024;
var stripH = 1024;
var ang;
var sectionLength;
var heightRatio;

function preload() {
	keyImg = loadImage('assets/key.png');
	keyPress = loadImage('assets/keyPressed.png');
	note1 = loadImage('assets/note.png');
	note2 = loadImage('assets/note2.png');
	hitSound = loadSound('assets/normal-hitnormal.ogg');
	sliderTop = loadImage('assets/sliderTop.png');
	sliderMid = loadImage('assets/sliderMid.png');
	sliderTail = loadImage('assets/sliderTail.png');
	img = loadImage('assets/wallTexture.png');
}

let graphics;
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
	graphics = createGraphics(0, 0);
	graphics.rect(128 / 4, 0, 128, 10);
	textureWrap(REPEAT);
	image(img, 0, 0);
}

let lates = [];
let lanes = [];
let lanePos = [];
let timer = 0;
let notemap = [[], [], [], []];
let canHit = [[], [], [], []];
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
let sliderId = 0;

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

	fill(100);
	strokeWeight(0);
	rotateX(1.25);

	fill(0);
	// rotateZ(millis() / 500);
	// rotateY(millis() / 500);
	//here, if the corresponding key is pressed, the image of a pressed key is shown
	//this is referred to as the judgement line

	for (let i = 0; i < 4; i++) {
		translate(0, 0, -25);
		foo.push(rect(x, 0, tSize / 4 + 45, tHeight + 3500));
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
					image(note.mid.image, note.x, note.mid.y, note.w, note.length);
					image(note.tail.image, note.x, note.tail.y, note.w, note.h);
			}
		}
		//and here removes them if they are past the judgement line
		for (let i = 0; i < column.length; i++) {
			if (column[i].y >= 600 && column[i].type === 'note') {
				lates.push(column[i]);
				// canHit.splice(i, 1);
				column.splice(i, 1);
				miss();
			} else if (column[i].type === 'slider') {
				if (column[i].tail.y > 600) {
					lates.push(column[i]);
					column.splice(i, 1);
					miss();
				}
			}
		}
	}
	rotateX(0.025);
	translate(0, 0, -5);
	//this will spawn a note every *note density value*
	translate(0, 0, 20);
	if (millis() >= scrollSpeed.value() + timer) {
		for (let column of notemap)
			for (let note of column) {
				note.y += scrollSpeed.value();
				note.jDist -= scrollSpeed.value();
				if (note.type === 'slider') {
					note.tail.y += scrollSpeed.value();
					note.mid.y += scrollSpeed.value();
				}

				if (note.jDist < 200 && canHit[notemap.indexOf(column)].length === 0) {
					canHit[notemap.indexOf(column)].push(note);
				}
			}
	}
	if (millis() >= nDesnsity.value() + timer) {
		fps = frameRate();
		dropCircle();
		timer = millis();
		for (let column of notemap) {
			for (let note of column) {
				if (note.type === 'slider') {
					if (note.active) {
						combo++;
					}
				}
			}
		}
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
	imageMode(CORNER);

	push();

	rotateY(millis() / 2000);
	heightRatio = (img.width * stripH) / img.height;
	ang = (-2 * PI) / res;
	sectionLength = (2 * PI * radius) / res;
	imageMode(CORNER);
	heightRatio = (img.width * stripH) / img.height;
	ang = (-2 * PI) / res;
	sectionLength = (2 * PI * radius) / res;
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

	push();
	translate(100, 100, 0);
	rotateX(-1.25);
	fill(255);
	textSize(30);
	text('FPS: ' + fps.toFixed(0), -950, -325);
	text('secs: ' + (millis() / 1000).toFixed(0), -950, -200);
	text('hits:' + hits, -950, -175);
	text(combo, 0, -300);
	text('miss:' + misses, -950, -125);

	pop();
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
			newSlider();
			sliderId++;
	}
}

function keyReleased() {
	switch (key) {
		case 'd':
			handleKeyRelease(0);
			break;
		case 'f':
			handleKeyRelease(1);
			break;
		case 'j':
			handleKeyRelease(2);
			break;
		case 'k':
			handleKeyRelease(3);
			break;
	}
}

function handleKeyPress(key) {
	keys[key] = true;
	let column = notemap[key];
	if (canHit[key].length > 0) {
		hitSound.play();
		hit(dist);
		column.splice(0, 1);
		notemap[column].splice(0, 1);
	}

	// for (let i = 0; i < column.length; i++) {
	// 	let dist = 400 - column[i].y;
	// 	if (dist < 200) {
	// 		if (column[i].type === 'note') {
	// 			hitSound.play();
	// 			hit(dist);
	// 			column.splice(i, 1);
	// 		} else if (column[i].type === 'slider') {
	// 			console.log('here');
	// 			column[i].active = true;
	// 			hitSound.play();
	// 			hit(dist);
	// 		}
	// 	}
	// }
}

function handleKeyRelease(key) {
	keys[key] = false;
	let column = notemap[key];
	for (let i = 0; i < column.length; i++) {
		let dist;
		if (column[i].type === 'slider') dist = 400 - column[i].tail.y;
		if (dist < 400 && column[i].active) {
			hit(dist);
			column.splice(i, 1);
			hitSound.play();
		}
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
		jDist: 1400,
		color: (0, 225, 255)
	};
	notemap[column].push(note);
}

function newSlider(_length = random(0, 10) * 100) {
	let column = Math.floor(random(0, 4));
	// let _length = random(0, 10) * 100;
	slider = {
		type: 'slider',
		image: sliderTop,
		x: lanePos[column],
		y: -1400,
		w: windowWidth * 0.02 * 2.56,
		h: windowWidth * 0.02 * 1.88,
		length: _length,
		active: false,
		mid: {
			image: sliderMid,
			y: -1400 - _length / 2
		},
		tail: {
			image: sliderTail,
			y: -1400 - _length
		}
	};
	notemap[column].push(slider);
}
