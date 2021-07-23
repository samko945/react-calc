import React from "react";
import Button from "./Button";
import "./ButtonGrid.css";

export default function ButtonGrid(props) {
	return (
		<div>
			<div className="button-row">
				<Button
					name="C"
					onClick={props.onClearClick}
					label={
						props.calcState.secondValue !== null || props.calcState.operator
							? "CE"
							: "C"
					}
					color="col-s2"
				/>
				<Button name="+/-" onClick={props.onOperatorClick} label="+/-" color="col-s2" />
				<Button name="%" onClick={props.onOperatorClick} label="%" color="col-s2" />
				<Button name="/" onClick={props.onOperatorClick} label="/" color="col-p1" />
			</div>
			<div className="button-row">
				<Button name="7" onClick={props.onValueClick} label="7" color="col-s1" />
				<Button name="8" onClick={props.onValueClick} label="8" color="col-s1" />
				<Button name="9" onClick={props.onValueClick} label="9" color="col-s1" />
				<Button name="*" onClick={props.onOperatorClick} label="*" color="col-p1" />
			</div>
			<div className="button-row">
				<Button name="4" onClick={props.onValueClick} label="4" color="col-s1" />
				<Button name="5" onClick={props.onValueClick} label="5" color="col-s1" />
				<Button name="6" onClick={props.onValueClick} label="6" color="col-s1" />
				<Button name="-" onClick={props.onOperatorClick} label="-" color="col-p1" />
			</div>
			<div className="button-row">
				<Button name="1" onClick={props.onValueClick} label="1" color="col-s1" />
				<Button name="2" onClick={props.onValueClick} label="2" color="col-s1" />
				<Button name="3" onClick={props.onValueClick} label="3" color="col-s1" />
				<Button name="+" onClick={props.onOperatorClick} label="+" color="col-p1" />
			</div>
			<div className="button-row">
				<Button
					name="0"
					onClick={props.onValueClick}
					size="double"
					label="0"
					color="col-s1"
				/>
				<Button name="." onClick={props.onValueClick} label="." color="col-s1" />
				<Button name="=" onClick={props.onEqualClick} label="=" color="col-p1" />
			</div>
		</div>
	);
}
