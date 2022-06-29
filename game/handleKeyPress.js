function handleKeyPress(key) {
	keys[key] = true;
	let column = notemap[key];
	// if (canHit[key].length > 0) {
	// 	hitSound.play();
	// 	hit(dist);
	// 	column.splice(0, 1);
	// 	notemap[column].splice(0, 1);
	// }

	for (let i = 0; i < column.length; i++) {
		let dist = 400 - column[i].y;
		if (dist < 200) {
			if (column[i].type === 'note') {
				hitSound.play();
				hit(dist);
				column.splice(i, 1);
			} else if (column[i].type === 'slider') {
				column[i].active = true;
				hitSound.play();
				hit(dist);
			}
		}
	}
}
