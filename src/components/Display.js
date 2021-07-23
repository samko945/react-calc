import React from "react";
import "./Display.css";

export default function Display(props) {
	let length = String(props.value).length;
	let fontSize = 27 / length;
	if (fontSize > 4) fontSize = 4;
	return (
		<div className="Display">
			<div className="display-value" style={{ fontSize: `${fontSize}rem` }}>
				{props.value}
			</div>
		</div>
	);
}
