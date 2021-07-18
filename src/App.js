import React, { useReducer } from "react";
import "./App.css";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";

const calcDefaultState = {
	currentValue: null,
	currentValueDecimal: false,
	previousValue: 0,
	operator: null,
};

const calcReducer = (state, action) => {
	if (action.type === "NEW_VALUE") {
		if (state.currentValue === null) {
			return { ...state, currentValue: action.value };
		} else {
			return { ...state, currentValue: state.currentValue + action.value };
		}
	}
	if (action.type === "OPERATE") {
		if (action.value === "/" || action.value === "*" || action.value === "-" || action.value === "+") {
			return { ...state, previousValue: state.currentValue, currentValue: null, operator: action.value };
		}
		if (action.value === "=") {
			const calculate = {
				"/": (a, b) => a / b,
				"*": (a, b) => a * b,
				"-": (a, b) => a - b,
				"+": (a, b) => a + b,
			};
			return { ...state, previousValue: calculate[state.operator](state.previousValue, state.currentValue || state.previousValue), currentValue: null, selectOperator: null };
		}
	}
	return calcDefaultState;
};

function App() {
	const [calcState, dispatchCalcAction] = useReducer(calcReducer, calcDefaultState);
	function updateCurrentValue(e) {
		dispatchCalcAction({ type: "NEW_VALUE", value: e.target.name });
	}
	function selectOperator(e) {
		dispatchCalcAction({ type: "OPERATE", value: e.target.name });
	}
	return (
		<div className="App">
			<Display value={calcState.currentValue || calcState.previousValue} />
			<ButtonGrid onValueClick={updateCurrentValue} onOperatorClick={selectOperator} />
		</div>
	);
}

export default App;
