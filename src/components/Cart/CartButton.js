import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
	const dispatch = useDispatch();
	const numberOfItems = useSelector((store) => store.cart.totalQuantity);
	const showCartHandler = () => {
		dispatch(uiActions.toggle());
	};

	return (
		<button className={classes.button} onClick={showCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{numberOfItems}</span>
		</button>
	);
};

export default CartButton;
