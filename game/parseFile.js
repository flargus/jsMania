function parseFile(songname = 'chakra', difficulty) {
	//song = loadStrings("songs/oshamaScramble/t+pazolite - Oshama Scramble! ([ A v a l o n ]) [Ria's NORMAL].osu");
	song = textTemp;
	let startLine;
	for (let i = 0; i < song.length; i++) {
		if (song[i] === '[HitObjects]') {
			startLine = i;
			i = song.length;
		}
	}

	for (let i = startLine; i < song.length; i++) {
		HitObjects.push(song[i]);
		let values = song[i].split(',');
		switch (values[0]) {
			case '64':
				if (values[3] === '128') newNote(0, values[2], true, values[5]);
				else newNote(0, values[2]);
				break;
			case '192':
				if (values[3] === '128') newNote(1, values[2], true, values[5]);
				else newNote(1, values[2]);
				break;
			case '320':
				if (values[3] === '128') newNote(2, values[2], true, values[5]);
				else newNote(2, values[2]);
				break;
			case '448':
				if (values[3] === '128') newNote(3, values[2], true, values[5]);
				else newNote(3, values[2]);
				break;
		}
	}
	console.log(mapNotes);
}
