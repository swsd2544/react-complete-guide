import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		postalCode: true,
		city: true,
	});
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);
		const enteredCityIsValid = !isEmpty(enteredCity);

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostalCodeIsValid &&
			enteredCityIsValid;

		setFormInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			postalCode: enteredPostalCodeIsValid,
			city: enteredCityIsValid,
		});

		if (!formIsValid) {
			return;
		}

		props.onSubmit({
			name: enteredName,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity,
		});
	};

	const nameControlClass = `${classes.control} ${
		formInputsValidity.name ? '' : classes.invalid
	} `;
	const streetControlClass = `${classes.control} ${
		formInputsValidity.street ? '' : classes.invalid
	} `;
	const postalCodeControlClass = `${classes.control} ${
		formInputsValidity.postalCode ? '' : classes.invalid
	} `;
	const cityControlClass = `${classes.control} ${
		formInputsValidity.city ? '' : classes.invalid
	} `;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClass}>
				<label htmlFor='name'>Your Name</label>
				<input ref={nameInputRef} type='text' id='name' />
				{!formInputsValidity.name && <p>Please enter a valid name!</p>}
			</div>
			<div className={streetControlClass}>
				<label htmlFor='street'>Street</label>
				<input ref={streetInputRef} type='text' id='street' />
				{!formInputsValidity.street && <p>Please enter a valid street!</p>}
			</div>
			<div className={postalCodeControlClass}>
				<label htmlFor='postal'>Postal</label>
				<input ref={postalCodeInputRef} type='text' id='postal' />
				{!formInputsValidity.postalCode && (
					<p>Please enter a valid postal code (5 characters long)!</p>
				)}
			</div>
			<div className={cityControlClass}>
				<label htmlFor='city'>City</label>
				<input ref={cityInputRef} type='text' id='city' />
				{!formInputsValidity.city && <p>Please enter a valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
