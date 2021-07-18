import React from "react";
import "./Display.css";

export default function Display(props) {
	return (
		<div className="Display">
			<div className="display-value">{props.value}</div>
		</div>
	);
}
