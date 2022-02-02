import { useState } from 'react';

import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import styles from './AddUser.module.css';

const AddUser = ({ onAddUser }) => {
	const [error, setError] = useState();
	const [user, setUser] = useState({ username: '', age: '' });

	const addUserHandler = (event) => {
		event.preventDefault();

		if (user.username.trim().length === 0 || user.age.trim().length === 0) {
			setError({
				title: 'Invalid input',
				message: 'Please enter a valid name and age (non-empty values).',
			});
			return;
		}
		if (parseInt(user.age) < 0) {
			setError({
				title: 'Invalid age',
				message: 'Please enter a valid age (> 0).',
			});
			return;
		}

		onAddUser(user.username, user.age);
		setUser({ username: '', age: '' });
	};

	const errorHandler = () => {
		setError(null);
	};

	const usernameChangeHandler = (event) => {
		setUser((prevState) => ({ ...prevState, username: event.target.value }));
	};

	const ageChangeHandler = (event) => {
		setUser((prevState) => ({ ...prevState, age: event.target.value }));
	};

	return (
		<>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onClick={errorHandler}
				/>
			)}
			<Card className={styles.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor='username'>Username</label>
					<input
						value={user.username}
						id='username'
						type='text'
						onChange={usernameChangeHandler}
					/>
					<label htmlFor='age'>Age (Years)</label>
					<input
						value={user.age}
						id='age'
						type='number'
						onChange={ageChangeHandler}
					></input>
					<Button type='submit'>Add User</Button>
				</form>
			</Card>
		</>
	);
};

export default AddUser;
