import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				'https://react-http-9aa96-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
			);

			if (!response.ok) {
				throw new Error('Could not fetch cart data!');
			}

			return await response.json();
		};

		try {
			const cartData = await fetchData();
			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity || 0,
				})
			);
		} catch (error) {
			dispatch(
				uiActions.addNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sending cart data failed!',
				})
			);
		}
	};
};

export const sendCartData = (cartData) => {
	return async (dispatch) => {
		dispatch(
			uiActions.addNotification({
				status: 'pending',
				title: 'Sending...',
				message: 'Sending cart data!',
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				'https://react-http-9aa96-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify({
						items: cartData.items,
						totalQuantity: cartData.totalQuantity,
					}),
				}
			);

			if (!response.ok) {
				throw new Error('Sending cart data failed.');
			}
		};

		try {
			await sendRequest();
			dispatch(
				uiActions.addNotification({
					status: 'success',
					title: 'Success!',
					message: 'Sent cart data successfully!',
				})
			);
		} catch (error) {
			dispatch(
				uiActions.addNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sending cart data failed!',
				})
			);
		}
	};
};
