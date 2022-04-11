import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../store/auth-context';
import classes from './AuthForm.module.css';

const API_KEY = 'FIREBASE_PROJECT_API_KEY';

const AuthForm = () => {
	const history = useHistory();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const authCtx = useContext(AuthContext);

	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// optional: Add validation

		let url;

		if (isLogin) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
		} else {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
		}

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) throw await response.json();

			const data = await response.json();
			const expirationTime = new Date(
				new Date().getTime() + +data.expiresIn * 1000
			);
			authCtx.login(data.idToken, expirationTime.toISOString());
			history.replace('/');
		} catch (error) {
			let errorMessage = 'Authentication failed!';
			alert(errorMessage);
		}
		setIsLoading(false);
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					{!isLoading && (
						<button>{isLogin ? 'Login' : 'Create Account'}</button>
					)}
					{isLoading && <button disabled>Sending request...</button>}
					<button
						type='button'
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
