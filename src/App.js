import { useState, createContext, useContext } from 'react';
import './App.css';
import Card from './Components/Card';
import Header from './Components/Header';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [activeTab, setActiveTab] = useState('reviewsheet');
	const [searchQuery, setSearchQuery] = useState('');
	const [filter, setFilter] = useState('Default');
	const [error, setError] = useState(null);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const handleSearch = (query, tab) => {
		setSearchQuery(query);
	};

	const handleFilterChange = (selectedFilter) => {
		if (['Default', 'Alphabetical', 'Category'].includes(selectedFilter)) {
			setError(null);
			setFilter(selectedFilter);
		} else {
			setError('Invalid filter selected.');
		}
	};

	return (
		<AppContext.Provider
			value={{
				activeTab,
				searchQuery,
				filter,
				error,
				handleTabClick,
				handleSearch,
				handleFilterChange,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const ErrorBoundary = ({ children }) => {
	const [hasError, setHasError] = useState(false);

	const componentDidCatch = (error, info) => {
		setHasError(true);
		console.error(error, info);
	};

	if (hasError) {
		return <div className='error-message'>Something went wrong.</div>;
	}

	return children;
};

const App = () => {
	const { error } = useContext(AppContext);

	return (
		<ErrorBoundary>
			<div className='app'>
				<Header />
				{error && <div className='error-message'>{error}</div>}
				<Card />
			</div>
		</ErrorBoundary>
	);
};

const WrappedApp = () => (
	<AppProvider>
		<App />
	</AppProvider>
);

export default WrappedApp;
