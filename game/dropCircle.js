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
