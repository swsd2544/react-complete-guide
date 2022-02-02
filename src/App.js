import { useState } from 'react';

import UserForm from './components/User/UserForm';
import UserList from './components/User/UserList';

const App = () => {
	const [users, setUsers] = useState([{ username: 'Fame', age: '20' }]);

	const onAddUser = (user) => {
		setUsers((prevState) => [user, ...prevState]);
	};

	return (
		<div>
			<UserForm onAddUser={onAddUser} />
			<UserList users={users} />
		</div>
	);
};

export default App;
