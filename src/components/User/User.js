import styles from './User.module.css';

const User = ({ username, age }) => {
	return (
		<div className={styles['user']}>{`${username} (${age} years old)`}</div>
	);
};

export default User;
