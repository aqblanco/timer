// Require ipcRender
const { ipcRenderer } = require('electron');
// Require Timer object
const { Timer } = require('./timer.js');

let timer = new Timer(timerDiv);
timer.initialize();

document.querySelector('#playPause').addEventListener('click', (event) => {
	playPause();
});

document.querySelector('#stop').addEventListener('click', (event) => {
	stop()
});

ipcRenderer.on('timer-play-pause', (event, data) => {
	playPause();
});

ipcRenderer.on('timer-stop', (event, data) => {
	stop();
});

function playPause() {
	let btn = document.querySelector('#playPause');

	if (btn.classList.contains('play')) {
		btn.classList.remove('play');
		btn.classList.add('pause');
		timer.isPaused = false;
	} else if (btn.classList.contains('pause')) {
		btn.classList.remove('pause');
		btn.classList.add('play');
		timer.isPaused = true;
	}
}

function stop() {
	timer.stop();

	// Always set the play/pause button into paused state
	if (document.querySelector('#playPause').classList.contains('pause')) {
		document.querySelector('#playPause').classList.remove('pause');
		document.querySelector('#playPause').classList.add('play');
	}
}