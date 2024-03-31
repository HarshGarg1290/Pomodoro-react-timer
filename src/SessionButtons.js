import React, { useState } from "react";
import "./SessionButtons.css";

export default function SessionButtons({ handleSessionChange }) {
	const [activeSessionType, setActiveSessionType] = useState("Focus");

	const updateActiveSessionType = (sessionType) => {
		setActiveSessionType(sessionType);
		handleSessionChange(sessionType);
	};

	return (
		<div className="SessionButtons">
			<div className="break-buttons">
				<button
					className={
						activeSessionType === "Short Break"
							? "active short-break"
							: "short-break"
					}
					onClick={() => updateActiveSessionType("Short Break")}
				>
					Short Break
				</button>
				<button
					className={
						activeSessionType === "Long Break"
							? "active long-break"
							: "long-break"
					}
					onClick={() => updateActiveSessionType("Long Break")}
				>
					Long Break
				</button>
			</div>
			<button
				className={activeSessionType === "Focus" ? "active focus" : "focus"}
				onClick={() => updateActiveSessionType("Focus")}
			>
				Focus
			</button>
		</div>
	);
}
