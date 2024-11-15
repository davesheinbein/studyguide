import React, { useState, useContext } from 'react';

import '../styles/Header/Header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGithub,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import {
	faGlobe,
	faMoon,
	faSun,
} from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import { AppContext } from '../App';

const Header = () => {
	const { handleTabClick, handleSearch, handleFilterChange } = useContext(AppContext);
	const [activeTab, setActiveTab] = useState('leetcode');
	const [filter, setFilter] = useState('Default');
	const [error, setError] = useState(null);
	const [darkMode, setDarkMode] = useState(false);

	const onTabClick = (tab) => {
		setActiveTab(tab);
		handleTabClick(tab);
	};

	const onSearchChange = (query) => {
		handleSearch(query, activeTab);
	};

	const onFilterChange = (selectedFilter) => {
		if (
			['Default', 'Alphabetical', 'Category'].includes(
				selectedFilter
			)
		) {
			setError(null);
			setFilter(selectedFilter);
			handleFilterChange(selectedFilter);
		} else {
			setError('Invalid filter selected.');
		}
	};

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		document.body.classList.toggle('dark-mode', !darkMode);
	};

	return (
		<header className='header'>
			<div className='left-section'>
				<div className='name'>Study Guide</div>
				<div className='tabs'>
					<div
						className={`tab ${
							activeTab === 'leetcode' ? 'active' : ''
						}`}
						onClick={() => onTabClick('leetcode')}
						role='button'
						tabIndex={0}
						onKeyPress={() => onTabClick('leetcode')}
						aria-label='LeetCode Tab'
					>
						LeetCode
					</div>
					<div
						className={`tab ${
							activeTab === 'principles' ? 'active' : ''
						}`}
						onClick={() => onTabClick('principles')}
						role='button'
						tabIndex={0}
						onKeyPress={() => onTabClick('principles')}
						aria-label='Principles Tab'
					>
						Principles
					</div>
					<div
						className={`tab ${
							activeTab === 'reviewsheet' ? 'active' : ''
						}`}
						onClick={() => onTabClick('reviewsheet')}
						role='button'
						tabIndex={0}
						onKeyPress={() => onTabClick('reviewsheet')}
						aria-label='Reviewsheet Tab'
					>
						Reviewsheet
					</div>
				</div>
			</div>
			<div className='right-section'>
				<FilterDropdown
					filter={filter}
					onFilterChange={onFilterChange}
				/>{' '}
				{/* Use the new FilterDropdown component */}
				<SearchBar onSearchChange={onSearchChange} />
				<div className='links'>
					<a
						href='https://github.com/davesheinbein/'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='GitHub'
					>
						<FontAwesomeIcon icon={faGithub} />
					</a>
					<a
						href='https://linkedin.com/in/david-sheinbein'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='LinkedIn'
					>
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
					<a
						href='https://davidsheinbeinengineer.com/'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='Personal Website'
					>
						<FontAwesomeIcon icon={faGlobe} />
					</a>
				</div>
				<button
					className='dark-mode-toggle'
					onClick={toggleDarkMode}
					aria-label='Toggle Dark Mode'
				>
					<FontAwesomeIcon
						icon={darkMode ? faSun : faMoon}
					/>
				</button>
			</div>
			{error && (
				<div className='error-message'>{error}</div>
			)}
		</header>
	);
};

export default Header;
