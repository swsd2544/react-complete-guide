import { useState } from 'react';
import styles from './UserForm.module.css';

const UserForm = ({ onAddUser }) => {
	const [isValid, setIsValid] = useState(true);
	const [username, setUsername] = useState('');
	const [age, setAge] = useState('');

	const usernameChangeHandler = ({ target }) => {
		setUsername(target.value);
		setIsValid(true);
	};

	const ageChangeHandler = ({ target }) => {
		setAge(target.value);
		setIsValid(true);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (username.trim().length === 0) {
			setIsValid(false);
			return;
		}

		if (parseInt(age) < 0 || parseInt(age) > 120) {
			setIsValid(false);
			return;
		}

		onAddUser({ username, age });
		setUsername('');
		setAge('');
	};

	return (
		<form
			className={`${styles['user-form']} ${!isValid && styles['invalid']}`}
			onSubmit={submitHandler}
		>
			<label>Username</label>
			<input type='text' value={username} onChange={usernameChangeHandler} />
			<label>Age (years)</label>
			<input type='number' value={age} onChange={ageChangeHandler} />
			<button type='submit'>Add User</button>
		</form>
	);
};

export default UserForm;
