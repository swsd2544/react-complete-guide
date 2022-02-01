import { useState } from 'react';
import './Expenses.css';

import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';

const Expenses = ({ expenses }) => {
	const [filteredYear, setFilteredYear] = useState('-');

	const onFilteredYearChangeHandler = (value) => {
		// console.log(value);
		setFilteredYear(value);
	};

	const filteredExpenses = expenses.filter((expense) => {
		if (filteredYear !== '-') {
			return expense.date.getFullYear().toString() === filteredYear;
		}
		return true;
	});

	return (
		<Card className='expenses'>
			<ExpensesFilter
				filteredYear={filteredYear}
				onFilteredYearChangeHandler={onFilteredYearChangeHandler}
			/>
			<ExpensesChart expenses={filteredExpenses} />
			<ExpensesList expenses={filteredExpenses} />
		</Card>
	);
};

export default Expenses;
