import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();

	const remainingDurationTime = adjExpirationTime - currentTime;
	return remainingDurationTime;
};

const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem('token');
	const storedExpirationDate = localStorage.getItem('expirationTime');

	const remainingTime = calculateRemainingTime(storedExpirationDate);

	if (remainingTime <= 1 * 60 * 1000) {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');
		return null;
	}

	return {
		token: storedToken,
		duration: remainingTime,
	};
};

export const AuthContextProvider = (props) => {
	const initialToken = retrieveStoredToken();
	const [token, setToken] = useState(initialToken ? initialToken.token : null);
	const logoutHandler = useCallback(() => {
		setToken(null);
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	useEffect(() => {
		if (initialToken) {
			logoutTimer = setTimeout(logoutHandler, initialToken.duration);
		}
	}, [initialToken, logoutHandler]);

	const userIsLoggedIn = !!token;

	const loginHandler = (token, expirationTime) => {
		setToken(token);
		localStorage.setItem('token', token);
		localStorage.setItem('expirationTime', expirationTime);

		const remainingTime = calculateRemainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
