function logic() {
	for (let column of notemap)
		for (let note of column) {
			note.y += scrollSpeed.value() * delta;
			note.jDist -= scrollSpeed.value() * delta;
			if (note.type === 'slider') {
				note.tail.y += scrollSpeed.value() * delta;
				note.mid.y += scrollSpeed.value() * delta;
			}

			if (note.jDist < 200 && canHit[notemap.indexOf(column)].length === 0) {
				canHit[notemap.indexOf(column)].push(note);
			}
		}
	if (millis() >= nDesnsity.value() + lastSpawn) {
		fps = frameRate();
		lastSpawn = millis();
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
}
