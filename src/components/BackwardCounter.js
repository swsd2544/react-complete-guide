import useCounter from '../hooks/use-counter';

import Card from './Card';

const counterFn = (prev) => prev - 1;

const BackwardCounter = () => {
	const counter = useCounter(counterFn);

	return <Card>{counter}</Card>;
};

export default BackwardCounter;
