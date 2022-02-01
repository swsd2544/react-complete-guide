import { useState } from 'react';
import Card from '../UI/Card';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
	const [showForm, setShowForm] = useState(false);
	const saveExpenseDataHandler = (enteredExpenseData) => {
		const expenseData = {
			...enteredExpenseData,
			id: Math.random().toString(),
		};
		// console.log(expenseData);
		props.onAddExpense(expenseData);
		setShowForm(false);
	};

	return (
		<Card className='new-expense'>
			{!showForm && (
				<button onClick={() => setShowForm(true)}>Add New Expense</button>
			)}
			{showForm && (
				<ExpenseForm
					onSaveExpenseData={saveExpenseDataHandler}
					onCancel={() => setShowForm(false)}
				/>
			)}
		</Card>
	);
};

export default NewExpense;
