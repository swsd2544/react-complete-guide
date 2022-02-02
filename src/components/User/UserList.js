import User from './User';
import styles from './UserList.module.css';

const UserList = ({ users }) => {
	return (
		<ul className={styles['user-list']}>
			{/* <User username='Fame' age='20' /> */}
			{users.map((user) => (
				<User username={user.username} age={user.age} />
			))}
		</ul>
	);
};

export default UserList;
