import React, {
	useContext,
	useEffect,
	useReducer,
	useState,
	useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const emailInitial = { value: '', isValid: undefined };

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.payload, isValid: action.payload.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
		return { ...state, isValid: state.value.includes('@') };
	}
	return emailInitial;
};

const passwordInitial = { value: '', isValid: undefined };

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.payload, isValid: action.payload.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { ...state, isValid: state.value.trim().length > 6 };
	}
	return passwordInitial;
};

const Login = (props) => {
	const authCtx = useContext(AuthContext);
	const [formIsValid, setFormIsValid] = useState(false);
	const [emailState, dispatchEmail] = useReducer(emailReducer, emailInitial);
	const [passwordState, dispatchPassword] = useReducer(
		passwordReducer,
		passwordInitial
	);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		return () => {
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', payload: event.target.value });
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', payload: event.target.value });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					id='email'
					label='E-Mail'
					type='email'
					value={emailState.value}
					isValid={emailIsValid}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					ref={passwordInputRef}
					id='password'
					label='Password'
					type='password'
					value={passwordState.value}
					isValid={passwordIsValid}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type='submit' className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
