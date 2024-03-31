import React from "react";

export default function TimerDisplay({ time, decrementTime, incrementTime }) {
	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
	};

	return (
		<div className="timer-display">
			<button onClick={decrementTime}>−</button>
			<h1>{formatTime(time)}</h1>
			<button onClick={incrementTime}>+</button>
		</div>
	);
}
