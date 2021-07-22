import React, { useReducer, useEffect } from "react";
import "./App.css";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";

const calcDefaultState = {
	values: [{ type: "VALUE", value: "0" }],
	display: "0",
};

const calcReducer = (state, action) => {
	if (action.type === "DISPLAY") {
		return { ...state, display: String(action.value) };
	}
	if (action.type === "VALUE") {
		const lastIndex = state.values.length - 1;
		if (state.values[lastIndex].type === action.type) {
			const newState = { ...state, values: [...state.values] };
			newState.values[lastIndex] = {
				...newState.values[lastIndex],
				value: state.values[lastIndex].value + action.value,
			};
			return newState;
		} else {
			return {
				...state,
				values: [...state.values, { type: action.type, value: action.value }],
			};
		}
	}

	if (action.type === "OPERATOR") {
		return {
			...state,
			values: [...state.values, { type: action.type, value: action.value }],
		};
	}

	const calculate = {
		"/": (a, b) => Number(a) / Number(b),
		"*": (a, b) => Number(a) * Number(b),
		"-": (a, b) => Number(a) - Number(b),
		"+": (a, b) => Number(a) + Number(b),
	};
	return calcDefaultState;
};

function App() {
	const [calcState, dispatchCalcAction] = useReducer(calcReducer, calcDefaultState);

	useEffect(() => {
		calcState.values.forEach((item) => {
			console.log(item.value);
			if (item.type === "VALUE") {
				dispatchCalcAction({
					type: "DISPLAY",
					value: Number(item.value),
				});
			}
		});
	}, [calcState.values]);

	function updateCurrentValue(e) {
		dispatchCalcAction({ type: "VALUE", value: e.target.name });
	}
	function selectOperator(e) {
		dispatchCalcAction({ type: "OPERATOR", value: e.target.name });
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
