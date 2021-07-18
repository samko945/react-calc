import React from "react";
import "./Button.css";

export default function Button(props) {
	const isButtonLarge = props.size === "double";
	return (
		<button name={props.name} className={`${isButtonLarge ? "size-double" : ""} ${props.color}`} onClick={props.onClick}>
			{props.label}
		</button>
	);
}
