import React, { useReducer } from "react";
import "./App.css";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";

const calcDefaultState = {
	firstValue: null,
	secondValue: null,
	operator: null,
	lastChanged: "firstValue",
};

const calcReducer = (state, action) => {
	if (action.type === "NEW_VALUE") {
		if (state.operator !== null) {
			// if there's an operator selected, user is entering the second value
			if (state.secondValue === null) {
				// replace null with first digit
				return { ...state, secondValue: action.value, lastChanged: "secondValue" };
			} else {
				// otherwise concat the new digit to the previous
				return {
					...state,
					secondValue: state.secondValue + action.value,
					lastChanged: "secondValue",
				};
			}
		}
		if (state.firstValue === null) {
			// replace null with first digit
			return { ...state, firstValue: action.value, lastChanged: "firstValue" };
		} else {
			// otherwise concat the new digit to the previous
			return {
				...state,
				firstValue: state.firstValue + action.value,
				lastChanged: "firstValue",
			};
		}
	}
	if (action.type === "OPERATE") {
		const calculate = {
			"/": (a, b) => Number(a) / Number(b),
			"*": (a, b) => Number(a) * Number(b),
			"-": (a, b) => Number(a) - Number(b),
			"+": (a, b) => Number(a) + Number(b),
		};

		// don't set an operator if there is no first value
		if (state.firstValue === null) return { ...state };

		if (
			action.value === "/" ||
			action.value === "*" ||
			action.value === "-" ||
			action.value === "+"
		) {
			// set operator
			if (state.operator === null) {
				return { ...state, operator: action.value };
			} else {
				if (state.secondValue === null) return { ...state };
				return {
					...state,
					operator: action.value,
					firstValue: calculate[state.operator](state.firstValue, state.secondValue),
					// secondValue: null,
					lastChanged: "firstValue",
				};
			}
		}

		if (action.value === "=") {
			// don't do anything if no operator is selected
			if (state.operator === null) return { ...state };
			return {
				...state,
				firstValue: calculate[state.operator](state.firstValue, state.secondValue),
				// secondValue: null,
				lastChanged: "firstValue",
			};
		}
	}

	if (action.type === "CLEAR") {
		if (state.secondValue === null && state.firstValue !== null) {
			if (state.operator !== null) {
				return { ...state, operator: null };
			} else {
				return { ...state, firstValue: null };
			}
		} else {
			if (state.secondValue !== null) {
				return { ...state, secondValue: null };
			} else {
				return { ...state, firstValue: null, operator: null, secondValue: null };
			}
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
	function clear() {
		dispatchCalcAction({ type: "CLEAR" });
	}
	return (
		<div className="App">
			<Display value={calcState[calcState.lastChanged] || 0} />
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
