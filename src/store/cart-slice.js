import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], totalQuantity: 0, changed: false };

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
			state.changed = false;
		},
		addItem(state, action) {
			const itemIndex = state.items.findIndex(
				(item) => item.title === action.payload.title
			);
			state.changed = true;
			if (itemIndex >= 0) {
				state.items[itemIndex].quantity++;
				state.items[itemIndex].total += action.payload.price;
			} else {
				state.items.push({
					...action.payload,
					quantity: 1,
					total: action.payload.price,
				});
			}
			state.totalQuantity++;
		},
		removeItem(state, action) {
			const itemIndex = state.items.findIndex(
				(item) => item.title === action.payload.title
			);
			state.changed = true;
			if (itemIndex >= 0) {
				if (state.items[itemIndex].quantity > 1) {
					state.items[itemIndex].quantity--;
					state.items[itemIndex].total -= action.payload.price;
				} else {
					state.items.splice(itemIndex, 1);
				}
			}
			state.totalQuantity--;
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
