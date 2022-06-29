function renderTrack() {
	//here, if the corresponding key is pressed, the image of a pressed key is shown
	//this is referred to as the judgement line
	push();
	let foo = [];
	let bar = [];
	let vs = [];
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
	pop();
	lanes = foo;
	lanePos = bar;
	jCircle = vs;
}
