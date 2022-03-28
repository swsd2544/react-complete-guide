import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
	const items = useSelector((store) => store.cart.items);

	const cartItems = items.map((item) => (
		<CartItem item={item} key={item.title} />
	));

	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			<ul>
				{/* <CartItem
					item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
				/> */}
				{cartItems}
			</ul>
		</Card>
	);
};

export default Cart;
