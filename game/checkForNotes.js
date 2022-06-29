function checkForNotes() {
	translate(0, 0, 20);
	if (millis() + soundOffset >= mapNotes[0].dropTime) {
		if (!playing) {
			music.play();
			playing = true;
		}
		notemap[mapNotes[0].col].push(mapNotes[0]);
		//dropCircle();
		//console.log(notemap);
		mapNotes.shift();
	}

	if (lates.length > 30) {
		lates.pop();
	}
}
