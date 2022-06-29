function game() {
	gameSetup();
	//change colour of notes when corresponding key is pressed
	//draw track columns
	renderTrack();
	//the notes that have been spawned are controlled here
	renderNotes();
	//this will spawn a note every *note density value*
	checkForNotes();
	drawNotes();
	//imageMode(CORNER);
	drawTunnel();
	//rotateY(millis() / 6000);
}
