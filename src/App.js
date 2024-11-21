import React, { useContext, useState } from 'react';
import './App.css';
import Card from './Components/Card';
import Header from './Components/Header';
import PopularSearches from './Components/PopularSearches';
import {
	AppProvider,
	AppContext,
} from './Context/AppContext';
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';

const ErrorBoundary = ({ children }) => {
	const [hasError, setHasError] = useState(false);

	const componentDidCatch = (error, info) => {
		setHasError(true);
		console.error(error, info);
	};

	if (hasError) {
		return (
			<div className='error-message'>
				Something went wrong.
			</div>
		);
	}

	return children;
};

const App = () => {
	const { error } = useContext(AppContext);

	return (
		<ErrorBoundary>
			<div className='app'>
				<Header />
				{error && (
					<div className='error-message'>{error}</div>
				)}
				<Routes>
					<Route
						path='/popular-searches'
						element={<PopularSearches />}
					/>
					<Route path='/' element={<Card />} />
				</Routes>
			</div>
		</ErrorBoundary>
	);
};

const WrappedApp = () => (
	<AppProvider>
		<Router>
			<App />
		</Router>
	</AppProvider>
);

export default WrappedApp;
