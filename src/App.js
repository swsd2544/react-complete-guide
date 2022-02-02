import { useState } from 'react';
import AddUser from './components/User/AddUser';
import UsersList from './components/User/UsersList';

const App = () => {
	const [users, setUsers] = useState([
		{ id: '0', username: 'Fame', age: '20' },
	]);

	const onAddUser = (username, age) => {
		setUsers((prevState) => [
			{ username, age, id: Math.random().toString() },
			...prevState,
		]);
	};

	return (
		<div>
			<AddUser onAddUser={onAddUser} />
			<UsersList users={users} />
		</div>
	);
};

export default App;
