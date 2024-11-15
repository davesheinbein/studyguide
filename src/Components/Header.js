import React, { useState } from 'react';
import '../styles/Header/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGithub,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onTabClick, onSearch }) => {
	const [activeTab, setActiveTab] = useState('reviewsheet');
	const [searchQuery, setSearchQuery] = useState('');

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		onTabClick(tab);
	};

	const handleSearchChange = (event) => {
		const query = event.target.value;
		setSearchQuery(query);
		onSearch(query, activeTab);
	};

	return (
		<header className='header'>
			<div className='left-section'>
				<div className='name'>Study Guide</div>
				<div className='tabs'>
					<div
						className={`tab ${
							activeTab === 'reviewsheet' ? 'active' : ''
						}`}
						onClick={() => handleTabClick('reviewsheet')}
					>
						Reviewsheet
					</div>
					<div
						className={`tab ${
							activeTab === 'leetcode' ? 'active' : ''
						}`}
						onClick={() => handleTabClick('leetcode')}
					>
						LeetCode
					</div>
					<div
						className={`tab ${
							activeTab === 'principles' ? 'active' : ''
						}`}
						onClick={() => handleTabClick('principles')}
					>
						Principles
					</div>
				</div>
			</div>
			<div className='right-section'>
				<div className='search-bar'>
						<input
						type='text'
						placeholder='Search...'
						value={searchQuery}
						onChange={handleSearchChange}
					/>
				</div>
				<div className='links'>
					<a
						href='https://github.com/davesheinbein/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FontAwesomeIcon icon={faGithub} />
					</a>
					<a
						href='https://linkedin.com/in/david-sheinbein'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
					<a
						href='https://davidsheinbeinengineer.com/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FontAwesomeIcon icon={faGlobe} />
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
