import { createContext, useState, useEffect } from 'react';
import leetcodeData from '../data/leetcode.json';
import principlesData from '../data/principles.json';
import reviewsheetData from '../data/reviewsheet.json';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [activeTab, setActiveTab] = useState('leetcode');
	const [searchQuery, setSearchQuery] = useState('');
	const [filter, setFilter] = useState('Default');
	const [error, setError] = useState(null);
	const [results, setResults] = useState([]);
	const [topics, setTopics] = useState([]);
	const [darkMode, setDarkMode] = useState(false);
	const [reviewsheet, setReviewsheet] = useState([]);
	const [leetcode, setLeetcode] = useState([]);
	const [principles, setPrinciples] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [expandedCard, setExpandedCard] = useState(null);
	const [filteredTopics, setFilteredTopics] = useState([]);
	const [isFocused, setIsFocused] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [expandCard, setExpandCard] = useState(false);

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

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		document.body.classList.toggle('dark-mode', !darkMode);
	};

	const resetResults = () => {
		window.location.reload();
	};

	const explorePopularSearches = () => {
		window.location.href = '/popular-searches';
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
				darkMode,
				reviewsheet,
				leetcode,
				principles,
				filteredData,
				expandedCard,
				filteredTopics,
				isFocused,
				isOpen,
				expandCard,
				setReviewsheet,
				setLeetcode,
				setPrinciples,
				setFilteredData,
				setError,
				setExpandedCard,
				setSearchQuery,
				setFilteredTopics,
				setIsFocused,
				setIsOpen,
				setExpandCard,
				handleTabClick,
				handleSearch,
				handleFilterChange,
				toggleDarkMode,
				resetResults,
				explorePopularSearches,
				setFilter,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
