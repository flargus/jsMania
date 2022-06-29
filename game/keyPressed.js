function keyPressed() {
	switch (key) {
		case 'd':
			handleKeyPress(0);
			break;
		case 'f':
			handleKeyPress(1);
			break;
		case 'j':
			handleKeyPress(2);
			break;
		case 'k':
			handleKeyPress(3);
			break;
		case 'v':
			newSlider();
			sliderId++;
	}
}
