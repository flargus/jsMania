function renderNotes() {
	push();
	translate(0, 0, 5);
	fill(255, 255, 255);
	translate(0, 0, 5);
	rotateX(-0.025);
	for (let column of notemap) {
		//draw all notes
		for (let note of column) {
			fill(0, 255, 255);
			switch (note.type) {
				case 'note':
					image(note.image, lanePos[note.col], note.y, note.w, note.h);
					break;
				case 'slider':
					image(note.image, lanePos[note.col], note.y, note.w, note.h);
					image(note.mid.image, lanePos[note.col], note.mid.y, note.w, note.length);
					image(note.tail.image, lanePos[note.col], note.tail.y, note.w, note.h);
					break;
			}
		}

		//and here removes them if they are past the judgement line
		for (let i = 0; i < column.length; i++) {
			if (column[i].y >= 600 && column[i].type === 'note') {
				lates.push(column[i]);
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
}
