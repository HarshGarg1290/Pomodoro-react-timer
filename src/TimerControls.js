import React from "react";
import {
	FaPlay,
	FaPause,
	FaRedo,
} from "react-icons/fa";

export default function TimerControls({
	
	timerActive,
	toggleTimer,
	resetTimer,
}) {
	return (
		<div className="timer-buttons">
			<button className="playpause-icon" onClick={toggleTimer}>
				{timerActive ? <FaPause /> : <FaPlay />}
			</button>
			<button title="Reload Timer" className="reset-icon" onClick={resetTimer}>
				<FaRedo />
			</button>
		</div>
	);
}
