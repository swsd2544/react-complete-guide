import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameInputChangeHandler,
		valueBlurHandler: nameInputBlurHandler,
		resetValue: resetNameInput,
	} = useInput((input) => input.trim() !== '');

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailInputChangeHandler,
		valueBlurHandler: emailInputBlurHandler,
		resetValue: resetEmailInput,
	} = useInput((input) => input.includes('@'));

	const formIsValid = enteredNameIsValid && enteredEmailIsValid;

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		resetNameInput();
		resetEmailInput();
	};

	const nameInputClasses = nameInputHasError
		? 'form-control invalid'
		: 'form-control';

	const emailInputClasses = emailInputHasError
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					value={enteredName}
					onBlur={nameInputBlurHandler}
					onChange={nameInputChangeHandler}
				/>
				{nameInputHasError && (
					<p className='error-text'>Name must not be empty.</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='email'>Your Email</label>
				<input
					type='email'
					id='email'
					value={enteredEmail}
					onBlur={emailInputBlurHandler}
					onChange={emailInputChangeHandler}
				/>
				{emailInputHasError && (
					<p className='error-text'>Email must include '@'.</p>
				)}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
