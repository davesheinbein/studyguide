import React, { useState, useEffect } from 'react';
import '../styles/SearchBar/SearchBar.css';

const SearchBar = ({ onSearchChange }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (searchQuery.length <= 100) {
				onSearchChange(searchQuery);
			}
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [searchQuery, onSearchChange]);

	const handleChange = (event) => {
		const query = event.target.value;
		if (query.length > 100) {
			setError('Search query is too long.');
		} else {
			setError(null);
			setSearchQuery(query);
		}
	};

	return (
		<div className='search-bar'>
			<input
				type='text'
				placeholder='Search by topic, category, or ID...'
				value={searchQuery}
				onChange={handleChange}
				aria-label='Search'
				aria-invalid={!!error}
				aria-describedby='search-error'
			/>
			{error && (
				<div id='search-error' className='error-message'>
					{error}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
