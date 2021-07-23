import React, { useReducer } from "react";
import "./App.css";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";

const calcDefaultState = {
	values: [{ type: "VALUE", value: "" }],
	display: "0",
};

const calcReducer = (state, action) => {
	const lastIndex = state.values.length - 1;
	function reduceInputs() {
		if (!state.values.length >= 3) return 0;
		const calculate = {
			"/": (a, b) => Number(a) / Number(b),
			"*": (a, b) => Number(a) * Number(b),
			"-": (a, b) => Number(a) - Number(b),
			"+": (a, b) => Number(a) + Number(b),
		};
		const result = state.values.reduce((accumulator, currentValue, index) => {
			if (index <= 1) return accumulator;
			if (currentValue.type === "OPERATOR") return accumulator;
			const operator = state.values[index - 1];
			// skip entry if it's not an operator
			if (operator.type !== "OPERATOR") return accumulator;
			return calculate[operator.value](accumulator, currentValue.value);
		}, state.values[0].value);
		return result;
	}
	if (action.type === "UPDATE_DISPLAY") {
		return { ...state, display: reduceInputs() };
	}

	if (action.type === "VALUE") {
		// append new digit to existing digits forming new value
		if (state.values[lastIndex].type === action.type) {
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
			// add value as new entry
			return {
				...state,
				values: [...state.values, { type: action.type, value: action.value }],
				display: action.value,
			};
		}
	}

	if (action.type === "OPERATOR") {
		// ammend existing operator entry with the new value
		if (state.values[lastIndex].type === "OPERATOR") {
			const newState = {
				...state,
				values: [...state.values],
			};
			newState.values[lastIndex] = {
				...newState.values[lastIndex],
				value: action.value,
			};
			return newState;
		}
		// add operator as new entry
		return {
			...state,
			values: [...state.values, { type: action.type, value: action.value }],
			display: reduceInputs(),
		};
	}

	if (action.type === "EQUAL") {
		const lastEntry = state.values[lastIndex];
		if (lastEntry.type !== "EQUAL") {
			return {
				...state,
				values: [...state.values, { type: action.type, value: action.value }],
				display: reduceInputs(),
			};
		}
		if (lastEntry.type === "EQUAL") {
			const lastOperatorEntry = state.values[lastIndex - 2];
			const lastValueEntry = state.values[lastIndex - 1];
			return {
				...state,
				values: [
					...state.values,
					lastOperatorEntry,
					lastValueEntry,
					{ type: action.type, value: action.value },
				],
				display: reduceInputs(),
			};
		}
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
	}
	function equalHandler(e) {
		dispatchCalcAction({ type: "EQUAL", value: e.target.name });
		dispatchCalcAction({ type: "UPDATE_DISPLAY" });
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
				onEqualClick={equalHandler}
				onClearClick={clear}
			/>
		</div>
	);
}

export default App;
