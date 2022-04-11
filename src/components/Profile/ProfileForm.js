import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../store/auth-context';
import classes from './ProfileForm.module.css';

const API_KEY = 'FIREBASE_PROJECT_API_KEY';

const ProfileForm = () => {
	const history = useHistory();
	const authCtx = useContext(AuthContext);
	const newPasswordInputRef = useRef();

	const submitHandler = async (event) => {
		event.preventDefault();

		const enteredNewPassword = newPasswordInputRef.current.value;

		// optional: Add validation

		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
				{
					method: 'POST',
					body: JSON.stringify({
						idToken: authCtx.token,
						password: enteredNewPassword,
						returnSecureToken: false,
					}),
					headers: { 'Content-Type': 'application/json' },
				}
			);

			const data = await response.json();

			if (!response.ok) throw data?.error;

			console.log(data);
			history.replace('/');
		} catch (error) {
			console.log(error);
			alert('Authentication failed!');
		}
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='new-password'>New Password</label>
				<input
					type='password'
					id='new-password'
					minLength='8'
					ref={newPasswordInputRef}
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
