import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const inputRef = useRef();

	const formSubmitHandler = (event) => {
		event.preventDefault();

		const numberOfItemsString = inputRef.current.value;
		const numberOfItems = parseInt(numberOfItemsString);
		if (
			numberOfItemsString.trim().length === 0 ||
			numberOfItems < 0 ||
			numberOfItems > 5
		) {
			setAmountIsValid(false);
			return;
		}

		props.onSubmit(numberOfItems);
	};

	return (
		<form className={classes.form} onSubmit={formSubmitHandler}>
			<Input
				ref={inputRef}
				label='Amount'
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please enter the valid amount (1-5).</p>}
		</form>
	);
};

export default MealItemForm;
