import React, { useContext, useEffect } from 'react';
import '../styles/SearchBar/SearchBar.css';
import { AppContext } from '../Context/AppContext';

const SearchBar = ({ onSearchChange }) => {
	const {
		searchQuery,
		setSearchQuery,
		error,
		setError,
		activeTopics,
		filteredTopics,
		setFilteredTopics,
		isFocused,
		setIsFocused,
	} = useContext(AppContext);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (searchQuery.length <= 100) {
				onSearchChange(searchQuery);
				setFilteredTopics(
					activeTopics.filter((topic) =>
						topic
							.toLowerCase()
							.includes(searchQuery.toLowerCase())
					)
				);
			}
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [
		searchQuery,
		onSearchChange,
		activeTopics,
		setFilteredTopics,
	]);

	const handleChange = (event) => {
		const query = event.target.value;
		if (query.length > 100) {
			setError('Search query is too long.');
		} else {
			setError(null);
			setSearchQuery(query);
		}
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const handleSelect = (topic) => {
		setSearchQuery(topic);
		onSearchChange(topic);
		setIsFocused(false);
	};

	const handleClear = () => {
		setSearchQuery('');
		onSearchChange('');
		setFilteredTopics([]);
	};

	return (
		<div className='search-bar'>
			<input
				type='text'
				placeholder='Search by topic, category, or ID...'
				value={searchQuery}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				aria-label='Search'
				aria-invalid={!!error}
				aria-describedby='search-error'
			/>
			{searchQuery && (
				<button
					className='clear-button'
					onClick={handleClear}
					aria-label='Clear search'
				>
					&times;
				</button>
			)}
			{error && (
				<div id='search-error' className='error-message'>
					{error}
				</div>
			)}
			{isFocused && filteredTopics.length > 0 && (
				<ul className='autocomplete-dropdown'>
					{filteredTopics.map((topic, index) => (
						<li
							key={index}
							onMouseDown={() => handleSelect(topic)}
						>
							{topic}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;
