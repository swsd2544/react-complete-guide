import useInput from '../hooks/use-input';

const BasicForm = (props) => {
	const {
		value: enteredFirstname,
		isValid: enteredFirstnameIsValid,
		hasError: enteredFirstnameHasError,
		valueChangeHandler: firstnameInputChangeHandler,
		valueBlurHandler: firstnameInputBlurHandler,
		resetValue: resetFirstnameInput,
	} = useInput((value) => value.trim() !== '');

	const {
		value: enteredLastname,
		isValid: enteredLastnameIsValid,
		hasError: enteredLastnameHasError,
		valueChangeHandler: lastnameInputChangeHandler,
		valueBlurHandler: lastnameInputBlurHandler,
		resetValue: resetLastnameInput,
	} = useInput((value) => value.trim() !== '');

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: enteredEmailHasError,
		valueChangeHandler: emailInputChangeHandler,
		valueBlurHandler: emailInputBlurHandler,
		resetValue: resetEmailInput,
	} = useInput((value) => value.includes('@'));

	const formIsValid =
		enteredEmailIsValid && enteredFirstnameIsValid && enteredLastnameIsValid;

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		resetFirstnameInput();
		resetLastnameInput();
		resetEmailInput();
	};

	const firstnameInputClasses = enteredFirstnameHasError
		? 'form-control invalid'
		: 'form-control';

	const lastnameInputClasses = enteredLastnameHasError
		? 'form-control invalid'
		: 'form-control';

	const emailInputClasses = enteredEmailHasError
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className='control-group'>
				<div className={firstnameInputClasses}>
					<label htmlFor='firstname'>First Name</label>
					<input
						type='text'
						id='firstname'
						value={enteredFirstname}
						onChange={firstnameInputChangeHandler}
						onBlur={firstnameInputBlurHandler}
					/>
					{enteredFirstnameHasError && (
						<p className='error-text'>First Name must not empty</p>
					)}
				</div>
				<div className={lastnameInputClasses}>
					<label htmlFor='lastname'>Last Name</label>
					<input
						type='text'
						id='lastname'
						value={enteredLastname}
						onChange={lastnameInputChangeHandler}
						onBlur={lastnameInputBlurHandler}
					/>
					{enteredLastnameHasError && (
						<p className='error-text'>Last Name must not empty</p>
					)}
				</div>
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='email'>E-Mail Address</label>
				<input
					type='email'
					id='email'
					value={enteredEmail}
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
				/>
				{enteredEmailHasError && (
					<p className='error-text'>Email must include '@'</p>
				)}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
