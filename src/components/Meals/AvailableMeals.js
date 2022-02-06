import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/use-http';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const { isLoading, error, sendRequest } = useHttp();

	useEffect(() => {
		const transformMeals = (mealsObj) => {
			const loadedMeals = [];
			for (const mealId in mealsObj) {
				loadedMeals.push({
					id: mealId,
					name: mealsObj[mealId].name,
					description: mealsObj[mealId].description,
					price: mealsObj[mealId].price,
				});
			}
			setMeals(loadedMeals);
		};
		sendRequest(
			{
				url: 'https://react-http-9aa96-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json',
			},
			transformMeals
		);
	}, [sendRequest]);

	const mealsList =
		meals.length !== 0
			? meals.map((meal) => {
					return (
						<MealItem
							key={meal.id}
							id={meal.id}
							name={meal.name}
							description={meal.description}
							price={meal.price}
						/>
					);
			  })
			: [];

	return (
		<section className={classes.meals}>
			<Card>
				{!isLoading && !error && <ul>{mealsList}</ul>}
				{!isLoading && error && <p className={classes.console}>{error}</p>}
				{isLoading && <p className={classes.console}>Loading...</p>}
			</Card>
		</section>
	);
};

export default AvailableMeals;
