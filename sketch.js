let nDesnsity;
let scrollSpeed;
let hitSound;
let keyImg;
let noteImg;
let sliderTop;
let sliderMid;
let sliderTail;
let wallTexture;
let flash;
let graphics;
let music;

var rows = 22;
var img;
var res = 8;
var radius = 1000;
var stripH = 1500;
var ang;
var sectionLength;
var heightRatio;
var tunnelOffset = 0;
var globalTint = 0;
var addColor = true;
var textTemp;

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
	flash = loadImage('assets/flash.png');
	music = loadSound('songs/chakra/1494300 uma - Chakra/audio.mp3');
	textTemp = loadStrings('songs/chakra/1494300 uma - Chakra/uma - Chakra (Shima Rin) [MAXIMUM].osu');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	nDesnsity = createSlider(200, 1000);
	nDesnsity.position(0, 0);
	scrollSpeed = createSlider(2000, 3000);
	scrollSpeed.position(0, 30);
	frameRate(240);
	let font = loadFont('/assets/futuraBook.otf');
	textFont(font);
	noteImgs = [note1, note2];
	graphics = createGraphics(0, 0);
	graphics.rect(128 / 4, 0, 128, 10);
	textureWrap(REPEAT);
	image(img, 0, 0);
	parseFile('chakra');
	setInterval(milliLoop, 1);
}

let soundOffset = 0;
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
let lastSpawn = 0;
let delta = 0;
let distance = 1000;
let HitObjects = [];
let noteIndex = 0;
let songName = 'oshamaScramble';
let song = [];
let drops = [];
let playing = false;
var mapNotes = [];
let fps;
let seconds = 0;
let tSize;
let tHeight;

function draw() {
	game();
}
