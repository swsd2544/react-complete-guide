import { useReducer } from 'react/cjs/react.development';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.payload.amount * action.payload.price;

		const itemIdx = state.items.findIndex(
			(item) => item.id === action.payload.id
		);
		const existingItem = state.items[itemIdx];
		let updatedItems;

		if (existingItem) {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount + action.payload.amount,
			};
			updatedItems = [...state.items];
			updatedItems[itemIdx] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.payload);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === 'REMOVE') {
		const itemIdx = state.items.findIndex((item) => item.id === action.payload);
		const existingItem = state.items[itemIdx];
		const updatedTotalAmount = state.totalAmount - existingItem.price;

		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.payload);
		} else {
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			updatedItems = [...state.items];
			updatedItems[itemIdx] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
		dispatchCart({ type: 'ADD', payload: item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCart({ type: 'REMOVE', payload: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
