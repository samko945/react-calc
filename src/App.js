import React, { useReducer } from "react";
import "./App.css";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";

const calcDefaultState = {
	values: [{ type: "VALUE", value: "" }],
	display: "0",
};

const calcReducer = (state, action) => {
	if (action.type === "VALUE") {
		const lastIndex = state.values.length - 1;
		// if the last input type is a value, and another value is entered -> the user is still entering same value -> concat strings
		if (state.values[lastIndex].type === action.type && action.type === "VALUE") {
			const newState = {
				...state,
				values: [...state.values],
				display: state.values[lastIndex].value + action.value,
			};
			newState.values[lastIndex] = {
				...newState.values[lastIndex],
				value: state.values[lastIndex].value + action.value,
			};
			return newState;
		} else {
			return {
				...state,
				values: [...state.values, { type: action.type, value: action.value }],
				display: action.value,
			};
		}
	}

	if (action.type === "OPERATOR") {
		return {
			...state,
			values: [...state.values, { type: action.type, value: action.value }],
		};
	}

	if (action.type === "CALCULATE") {
		if (!state.values.length >= 3) return { ...state };
		const calculate = {
			"/": (a, b) => Number(a) / Number(b),
			"*": (a, b) => Number(a) * Number(b),
			"-": (a, b) => Number(a) - Number(b),
			"+": (a, b) => Number(a) + Number(b),
		};
		const result = state.values.reduce((accumulator, currentValue, index) => {
			if (index <= 1) return accumulator;
			if (currentValue.type === "OPERATOR") return accumulator;
			const operator = state.values[index - 1].value;
			console.log(accumulator, operator, currentValue.value);
			return calculate[operator](accumulator, currentValue.value);
		}, state.values[0].value);
		return { ...state, display: result };
	}

	return calcDefaultState;
};

function App() {
	const [calcState, dispatchCalcAction] = useReducer(calcReducer, calcDefaultState);

	function updateCurrentValue(e) {
		dispatchCalcAction({ type: "VALUE", value: e.target.name });
	}
	function selectOperator(e) {
		dispatchCalcAction({ type: "OPERATOR", value: e.target.name });
		dispatchCalcAction({ type: "CALCULATE" });
	}
	function clear() {
		dispatchCalcAction({ type: "CLEAR" });
	}
	return (
		<div className="App">
			<Display value={calcState.display} />
			<ButtonGrid
				calcState={calcState}
				onValueClick={updateCurrentValue}
				onOperatorClick={selectOperator}
				onClearClick={clear}
			/>
		</div>
	);
}

export default App;
