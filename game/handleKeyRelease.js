function handleKeyRelease(key) {
	keys[key] = false;
	let column = notemap[key];
	for (let i = 0; i < column.length; i++) {
		let dist;
		if (column[i].type === 'slider') {
			dist = 400 - column[i].tail.y;
		}
		if (dist < 400 && column[i].active) {
			hit(dist);
			column.splice(i, 1);
			hitSound.play();
		}
		column[i].active = false;
	}
}
