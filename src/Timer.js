import React, { useState, useEffect } from "react";
import "./Timer.css";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import { Circle } from 'rc-progress';

const DEFAULT_TIMES_KEY = "defaultTimes";
const DEFAULT_TIMES = {
	Focus: 1500, // 25 minutes
	"Short Break": 300, // 5 minutes
	"Long Break": 1800, // 30 minutes
};

export default function Timer({ sessionType = "Focus" }) {
	const [time, setTime] = useState(() => {
	  const storedDefaultTimes = JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
	  return storedDefaultTimes[sessionType] || DEFAULT_TIMES[sessionType];
	});
	const [initialTime, setInitialTime] = useState(time); 
	const [remainingTime, setRemainingTime] = useState(time);
	const [timerActive, setTimerActive] = useState(false);
	const [showProgressWheel, setShowProgressWheel] = useState(false);
	useEffect(() => {
		setRemainingTime(time);
		setInitialTime(time);
	  }, [time]);
	

	  useEffect(() => {
		let interval;
		if (timerActive && remainingTime > 0) {
		  setShowProgressWheel(true);
		  interval = setInterval(() => {
			setRemainingTime(prevTime => prevTime - 1);
		  }, 1000);
		} else {
		  clearInterval(interval);
		  if (remainingTime === 0) {
			setShowProgressWheel(false);
			let dynamicTitle = false;
			interval = setInterval(() => {
			  dynamicTitle = !dynamicTitle;
			  document.title = dynamicTitle ? "⌛ Session completed!" : "✅ Click OK to start your next session";
			}, 1000);
			setTimeout(() => {
			  if (document.hasFocus()) {
				alert("⌛ Session completed!\n\n✅ Click OK to start your next session.");
				window.location.reload();
			  } else {
				const reloadPage = () => {
				  if (document.hasFocus()) {
					alert("⌛ Session completed!\n\n✅ Click OK to start your next session.");
					window.removeEventListener("focus", reloadPage);
					window.location.reload();
				  }
				};
				window.addEventListener("focus", reloadPage);
			  }
			}, 1000);
		  }
		}
		return () => clearInterval(interval);
	  }, [timerActive, remainingTime]);

	useEffect(() => {
		setTime(() => {
			const storedDefaultTimes =
				JSON.parse(localStorage.getItem(DEFAULT_TIMES_KEY)) || {};
			return storedDefaultTimes[sessionType] || DEFAULT_TIMES[sessionType];
		});
	}, [sessionType]);

	const toggleTimer = () => {
		setTimerActive((prevActive) => !prevActive);
	  };
	
	  const resetTimer = () => {
		setRemainingTime(initialTime); // Reset remaining time to initial time
		setShowProgressWheel(false);
		setTimerActive(false); // Pause the timer on reset
	  };
	
	  const incrementTime = () => {
		setTime(time + 60);
	  };
	
	  const decrementTime = () => {
		if (time > 60) {
		  setTime(time - 60);
		}
	  };
	
	  const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	  };
	
	  return (
		<div className="Timer">
		  {showProgressWheel ? (
			<div>
			  <Circle
				percent={(initialTime - remainingTime) / initialTime * 100}
				strokeWidth={5} 
				trailWidth={2}
				strokeColor="#D3D3D3" 
				trailColor="#f0f0f0"
				style={{
				  width: '300px',
				  height: '300px',
				  position: 'relative',
				}}
			  />
			  <div className="timer">
				{formatTime(remainingTime)}
			  </div>
			</div>
		  ) : (
			<TimerDisplay time={time} decrementTime={decrementTime} incrementTime={incrementTime} />
		  )}
		  <TimerControls timerActive={timerActive} toggleTimer={toggleTimer} resetTimer={resetTimer} />
		</div>
	  );
	}
