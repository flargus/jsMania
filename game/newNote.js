function newNote(column, time, isSlider = false, duration = 50) {
	let note;
	if (isSlider) {
		note = {
			col: column,
			type: 'slider',
			image: sliderTop,
			x: lanePos[column],
			y: -1400,
			w: windowWidth * 0.02 * 2.56,
			h: windowWidth * 0.02 * 1.88,
			length: duration,
			active: false,
			mid: {
				image: sliderMid,
				y: -1400 - duration
			},
			tail: {
				image: sliderTail,
				y: -1400 - duration
			},
			dropTime: time - 1000 / scrollSpeed.value()
		};
	} else {
		note = {
			col: column,
			type: 'note',
			image: column === 1 || column === 2 ? note2 : note1,
			x: lanePos[column],
			y: -1400,
			w: windowWidth * 0.02 * 2.56,
			h: windowWidth * 0.02 * 1.88,
			jDist: 1400,
			dropTime: time - 1000 / scrollSpeed.value()
		};
	}
	console.log(column);
	console.log(lanePos);
	console.log(lanePos[column]);
	mapNotes.push(note);
}
