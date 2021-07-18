import React from "react";
import Button from "./Button";
import "./ButtonGrid.css";

const color = {
	basePrimary: "",
	baseSecondary: "#616161",
	accent: "",
};

export default function ButtonGrid() {
	return (
		<div>
			<div className="button-row">
				<Button label="AC" color={color.baseSecondary} />
				<Button label="+/-" color={color.baseSecondary} />
				<Button label="%" color={color.baseSecondary} />
				<Button label="/" color={color.accent} />
			</div>
			<div className="button-row">
				<Button label="7" color={color.basePrimary} />
				<Button label="8" color={color.basePrimary} />
				<Button label="9" color={color.basePrimary} />
				<Button label="*" color={color.accent} />
			</div>
			<div className="button-row">
				<Button label="4" color={color.basePrimary} />
				<Button label="5" color={color.basePrimary} />
				<Button label="6" color={color.basePrimary} />
				<Button label="-" color={color.accent} />
			</div>
			<div className="button-row">
				<Button label="1" color={color.basePrimary} />
				<Button label="2" color={color.basePrimary} />
				<Button label="3" color={color.basePrimary} />
				<Button label="+" color={color.accent} />
			</div>
			<div className="button-row">
				<Button size="double" label="0" />
				<Button label="." color={color.basePrimary} />
				<Button label="=" color={color.accent} />
			</div>
		</div>
	);
}
