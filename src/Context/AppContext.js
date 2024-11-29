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
	const [isLeetCodeUnlocked, setLeetCodeUnlocked] =
		useState(() => {
			const savedState = localStorage.getItem(
				'isLeetCodeUnlocked'
			);
			return savedState === 'true';
		});
	const [unlockModalOpen, setUnlockModalOpen] =
		useState(false);
	const [unlockError, setUnlockError] = useState('');
	const [activeTopics, setActiveTopics] = useState([]);
	const [dataLoadError, setDataLoadError] = useState(false);

	useEffect(() => {
		try {
			const allTopics = [
				...leetcodeData.map((item) => item.topic),
				...principlesData.map((item) => item.topic),
				...reviewsheetData.map((item) => item.topic),
			];
			setTopics(allTopics);
		} catch (error) {
			setDataLoadError(true);
			console.error('Error loading data:', error);
		}
	}, []);

	useEffect(() => {
		try {
			let currentTopics = [];
			if (activeTab === 'leetcode') {
				currentTopics = leetcodeData.map(
					(item) => item.topic
				);
			} else if (activeTab === 'principles') {
				currentTopics = principlesData.map(
					(item) => item.topic
				);
			} else if (activeTab === 'reviewsheet') {
				currentTopics = reviewsheetData.map(
					(item) => item.topic
				);
			}
			setActiveTopics(currentTopics);
		} catch (error) {
			setDataLoadError(true);
			console.error('Error loading data:', error);
		}
	}, [activeTab]);

	const handleTabClick = (tab) => {
		try {
			setActiveTab(tab);
		} catch (error) {
			setError('Error changing tab.');
			console.error('Error changing tab:', error);
		}
	};

	const handleSearch = (query) => {
		try {
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
		} catch (error) {
			setError('Error performing search.');
			console.error('Error performing search:', error);
		}
	};

	const handleFilterChange = (selectedFilter) => {
		try {
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
		} catch (error) {
			setError('Error changing filter.');
			console.error('Error changing filter:', error);
		}
	};

	const toggleDarkMode = () => {
		try {
			setDarkMode(!darkMode);
			document.body.classList.toggle(
				'dark-mode',
				!darkMode
			);
		} catch (error) {
			setError('Error toggling dark mode.');
			console.error('Error toggling dark mode:', error);
		}
	};

	const resetResults = () => {
		try {
			window.location.reload();
		} catch (error) {
			setError('Error resetting results.');
			console.error('Error resetting results:', error);
		}
	};

	const explorePopularSearches = () => {
		try {
			window.location.href = '/popular-searches';
		} catch (error) {
			setError('Error exploring popular searches.');
			console.error(
				'Error exploring popular searches:',
				error
			);
		}
	};

	const handleUnlock = (code) => {
		try {
			const validCodes = [
				'Abcde12345!',
				'Sherlock!',
				'Testcode!',
			];
			if (validCodes.includes(code)) {
				const newUnlockState = !isLeetCodeUnlocked;
				setLeetCodeUnlocked(newUnlockState);
				if (newUnlockState) {
					localStorage.setItem(
						'isLeetCodeUnlocked',
						'true'
					);
					setActiveTab('leetcode');
				} else {
					localStorage.removeItem('isLeetCodeUnlocked');
					setActiveTab('principles');
				}
				setUnlockModalOpen(false);
				setUnlockError('');
			} else {
				setUnlockError('Incorrect code. Please try again.');
			}
		} catch (error) {
			setUnlockError('Error unlocking feature.');
			console.error('Error unlocking feature:', error);
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
				isLeetCodeUnlocked,
				setLeetCodeUnlocked,
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
				unlockModalOpen,
				setUnlockModalOpen,
				unlockError,
				setUnlockError,
				activeTopics,
				dataLoadError,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
