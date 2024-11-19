import {
	useState,
	createContext,
	useContext,
	useEffect,
} from 'react';
import './App.css';
import Card from './Components/Card';
import Header from './Components/Header';
import PopularSearches from './Components/PopularSearches';
import leetcodeData from './data/leetcode.json';
import principlesData from './data/principles.json';
import reviewsheetData from './data/reviewsheet.json';
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [activeTab, setActiveTab] = useState('leetcode');
	const [searchQuery, setSearchQuery] = useState('');
	const [filter, setFilter] = useState('Default');
	const [error, setError] = useState(null);
	const [results, setResults] = useState([]);
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		const allTopics = [
			...leetcodeData.map((item) => item.topic),
			...principlesData.map((item) => item.topic),
			...reviewsheetData.map((item) => item.topic),
		];
		setTopics(allTopics);
	}, []);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
		const allData = [
			...leetcodeData,
			...principlesData,
			...reviewsheetData,
		];
		const filteredResults = allData.filter(
			(item) =>
				item.category
					?.toLowerCase()
					.includes(query.toLowerCase()) ||
				item.topic
					?.toLowerCase()
					.includes(query.toLowerCase()) ||
				item.id.toString().includes(query)
		);
		setResults(filteredResults);
	};

	const handleFilterChange = (selectedFilter) => {
		if (
			['Default', 'Alphabetical', 'Category'].includes(
				selectedFilter
			)
		) {
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
				results,
				topics,
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
