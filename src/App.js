import { useSelector } from 'react-redux';

import Headers from './components/Header';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';

function App() {
	const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);

	return (
		<>
			<Headers />
			{!isAuthenticated && <Auth />}
			{isAuthenticated && <UserProfile />}
			<Counter />
		</>
	);
}

export default App;
