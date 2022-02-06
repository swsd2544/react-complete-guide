import { useCallback, useState } from 'react';

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const sendRequest = useCallback(async (requestConfig, transformData) => {
		setError(null);
		setIsLoading(true);
		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method || 'GET',
				headers: requestConfig.headers || {},
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
			});

			if (!response.ok) {
				throw new Error('Something went wrong...');
			}

			const data = await response.json();

			if (transformData) {
				transformData(data);
			}
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export default useHttp;
