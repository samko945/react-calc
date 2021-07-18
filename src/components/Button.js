import React from "react";
import "./Button.css";

export default function Button(props) {
	const isButtonLarge = props.size === "double";
	return (
		<button className={`${isButtonLarge ? "size-double" : ""}`} style={{ backgroundColor: props.color }}>
			{props.label}
		</button>
	);
}
