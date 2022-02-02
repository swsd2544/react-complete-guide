import ReactDOM from 'react-dom';

import Button from './Button';
import Card from './Card';

import styles from './ErrorModal.module.css';

const Backdrop = ({ onClick }) => {
	return <div className={styles.backdrop} onClick={onClick}></div>;
};

const ModalOverlay = ({ title, message, onClick }) => {
	return (
		<Card className={styles.modal}>
			<header className={styles.header}>
				<h2>{title}</h2>
			</header>
			<div className={styles.content}>
				<p>{message}</p>
			</div>
			<footer className={styles.actions}>
				<Button onClick={onClick}>Okay</Button>
			</footer>
		</Card>
	);
};

const ErrorModal = ({ title, message, onClick }) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClick={onClick} />,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<ModalOverlay title={title} message={message} onClick={onClick} />,
				document.getElementById('overlay-root')
			)}
		</>
	);
};

export default ErrorModal;
