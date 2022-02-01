import { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onSaveExpenseData, onCancel }) => {
	// const [showForm, setShowForm] = useState(false);
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState('');
	const [date, setDate] = useState('');

	const titleChangeHandler = ({ target }) => {
		setTitle(target.value);
	};

	const amountChangeHandler = ({ target }) => {
		setAmount(target.value);
	};

	const dateChangeHandler = ({ target }) => {
		setDate(target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const expenseData = {
			title,
			amount,
			date: new Date(date),
		};

		// console.log(expenseData);
		onSaveExpenseData(expenseData);
		setTitle('');
		setAmount('');
		setDate('');
	};

	// if (!showForm) {
	// 	return (
	// 		<div className='new-expense__actions'>
	// 			<button onClick={() => setShowForm(true)}>Add New Expense</button>
	// 		</div>
	// 	);
	// }

	return (
		<form onSubmit={submitHandler}>
			<div className='new-expense__controls'>
				<div className='new-expense__control'>
					<label>Title</label>
					<input type='text' value={title} onChange={titleChangeHandler} />
				</div>
				<div className='new-expense__control'>
					<label>Amount</label>
					<input
						type='number'
						min='0.01'
						step='0.01'
						value={amount}
						onChange={amountChangeHandler}
					/>
				</div>
				<div className='new-expense__control'>
					<label>Date</label>
					<input
						type='date'
						min='2019-01-01'
						max='2022-12-31'
						value={date}
						onChange={dateChangeHandler}
					/>
				</div>
			</div>
			<div className='new-expense__actions'>
				<button onClick={onCancel}>Cancel</button>
				<button type='submit'>Add New Expense</button>
			</div>
		</form>
	);
};

export default ExpenseForm;
