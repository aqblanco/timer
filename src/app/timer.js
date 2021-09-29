// Require moment.js
const moment = require('moment');

module.exports.Timer = class Timer {
	timer = null;
	textDiv;
	currentTime = 0;
	isPaused = true;
	isStopped = true;

	constructor(textDiv, currentTime = 0, isPaused = true, isStopped = true) {
		this.textDiv = textDiv;
		this.currentTime = currentTime;
		this.isPaused = isPaused;
		this.isStopped = isStopped;
	}

	initialize() {
		// Print out the time
		this.textDiv.innerHTML = this.#secondsToTime(this.currentTime);
	
		// Execute every second
		this.timer = setInterval(() => {
			if (!this.isPaused) {
				// Add one second
				this.currentTime++;
	
				// Print out the time
				this.textDiv.innerHTML = this.#secondsToTime(this.currentTime);
			}
		}, 1000); // 1 second
	}

	stop() {
		// Initialize time with value send with event
		this.currentTime = 0;
		this.isPaused = true;
		this.timer = null;

		// Print out the time
		this.textDiv.innerHTML = this.#secondsToTime(this.currentTime);
	}

	// Helper function, to format the time
	#secondsToTime(s) {
		let momentTime = moment.duration(s, 'seconds');
		let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
		let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();

		return `${min}:${sec}`;
	};
}