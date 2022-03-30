import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
	const { sendRequest, status } = useHttp(addQuote, false);
	const history = useHistory();

	useEffect(() => {
		if (status === 'completed') {
			history.push('/quotes');
		}
	}, [history, status]);

	const addQuoteHandler = (quoteData) => {
		sendRequest(quoteData);
	};

	return (
		<QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
	);
};

export default NewQuote;
