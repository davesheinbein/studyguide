import React, {
	useState,
	useEffect,
	useContext,
} from 'react';
import '../styles/SearchBar/SearchBar.css';
import { AppContext } from '../App';

const SearchBar = ({ onSearchChange }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [error, setError] = useState(null);
	const { topics } = useContext(AppContext);
	const [filteredTopics, setFilteredTopics] = useState([]);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (searchQuery.length <= 100) {
				onSearchChange(searchQuery);
				setFilteredTopics(
					topics.filter((topic) =>
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
	}, [searchQuery, onSearchChange, topics]);

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
