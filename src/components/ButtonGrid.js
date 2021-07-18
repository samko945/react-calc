import React from "react";
import Button from "./Button";
import "./ButtonGrid.css";

export default function ButtonGrid() {
	return (
		<div>
			<div className="button-row">
				<Button label="AC" color="col-s2" />
				<Button label="+/-" color="col-s2" />
				<Button label="%" color="col-s2" />
				<Button label="/" color="col-p1" />
			</div>
			<div className="button-row">
				<Button label="7" color="col-s1" />
				<Button label="8" color="col-s1" />
				<Button label="9" color="col-s1" />
				<Button label="*" color="col-p1" />
			</div>
			<div className="button-row">
				<Button label="4" color="col-s1" />
				<Button label="5" color="col-s1" />
				<Button label="6" color="col-s1" />
				<Button label="-" color="col-p1" />
			</div>
			<div className="button-row">
				<Button label="1" color="col-s1" />
				<Button label="2" color="col-s1" />
				<Button label="3" color="col-s1" />
				<Button label="+" color="col-p1" />
			</div>
			<div className="button-row">
				<Button size="double" label="0" color="col-s1" />
				<Button label="." color="col-s1" />
				<Button label="=" color="col-p1" />
			</div>
		</div>
	);
}
