import React from 'react';

const CartContext = React.createContext({
	items: [],
	totalAmount: 0,
	addItem: (item) => {},
	removeItem: (id) => {},
	orderItem: (address) => {},
});

export default CartContext;
