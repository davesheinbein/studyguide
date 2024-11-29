import React, { useContext, useState } from 'react';
import './App.css';
import Card from './Components/Card';
import Header from './Components/Header';
import PopularSearches from './Components/PopularSearches';
import Footer from './Components/Footer';
import NoResults from './Components/NoResults';
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
		console.error('Error caught in ErrorBoundary:', error, info);
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
	const { error, dataLoadError } = useContext(AppContext);

	return (
		<ErrorBoundary>
			<div className='app'>
				<Header />
				{error && (
					<div className='error-message'>{error}</div>
				)}
				{dataLoadError ? (
					<NoResults />
				) : (
					<Routes>
						<Route
							path='/popular-searches'
							element={<PopularSearches />}
						/>
						<Route path='/' element={<Card />} />
					</Routes>
				)}
				<Footer />
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
