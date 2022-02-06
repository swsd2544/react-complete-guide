import { useReducer } from 'react';

const initialInputState = {
	value: '',
	isTouched: false,
};

const inputStateReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return { value: action.value, isTouched: state.isTouched };
	}
	if (action.type === 'BLUR') {
		return { isTouched: true, value: state.value };
	}
	if (action.type === 'RESET') {
		return initialInputState;
	}

	return initialInputState;
};

const useInput = (validateInput) => {
	const [inputState, dispatchInput] = useReducer(
		inputStateReducer,
		initialInputState
	);

	const isValueValid = validateInput(inputState.value);
	const hasError = !isValueValid && inputState.isTouched;

	const valueChangeHandler = (event) => {
		dispatchInput({ type: 'INPUT', value: event.target.value });
	};

	const valueBlurHandler = () => {
		dispatchInput({ type: 'BLUR' });
	};

	const resetValue = () => {
		dispatchInput({ type: 'RESET' });
	};

	return {
		value: inputState.value,
		isValid: isValueValid,
		hasError,
		valueChangeHandler,
		valueBlurHandler,
		resetValue,
	};
};

export default useInput;
