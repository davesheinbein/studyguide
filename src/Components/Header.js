import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faLock,
	faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import Unlock from './Unlock';
import { AppContext } from '../Context/AppContext';

const Header = () => {
	const {
		handleTabClick,
		handleSearch,
		handleFilterChange,
		activeTab,
		filter,
		error,
		isLeetCodeUnlocked,
		setLeetCodeUnlocked,
	} = useContext(AppContext);

	const [isUnlockModalOpen, setUnlockModalOpen] =
		useState(false);
	const [unlockError, setUnlockError] = useState('');

	const onTabClick = (tab) => {
		handleTabClick(tab);
	};

	const onSearchChange = (query) => {
		handleSearch(query, activeTab);
	};

	const onFilterChange = (selectedFilter) => {
		handleFilterChange(selectedFilter);
	};

	const toggleUnlockModal = () => {
		setUnlockModalOpen(!isUnlockModalOpen);
	};

	const handleUnlock = (code) => {
		const validCodes =
			process.env.REACT_APP_VALID_CODES?.split(',');

		if (validCodes.includes(code)) {
			const newUnlockState = !isLeetCodeUnlocked;
			setLeetCodeUnlocked(newUnlockState);
			if (newUnlockState) {
				localStorage.setItem('isLeetCodeUnlocked', 'true');
				handleTabClick('leetcode');
			} else {
				localStorage.removeItem('isLeetCodeUnlocked');
				handleTabClick('principles');
			}
			setUnlockModalOpen(false);
			setUnlockError('');
		} else {
			setUnlockError('Incorrect code. Please try again.');
		}
	};

	return (
		<>
			<header className='header'>
				<div className='left-section'>
					<div className='name'>
						<Link to='/'>
							<img
								src='https://i.imgur.com/1DQ7j3Y.png'
								alt='Study Guide'
								className='logo-img'
							/>
						</Link>
					</div>
					<div className='tabs'>
						{isLeetCodeUnlocked && (
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
						)}
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
					/>
					<SearchBar onSearchChange={onSearchChange} />
					<FontAwesomeIcon
						icon={isLeetCodeUnlocked ? faUnlock : faLock}
						className='lock-icon'
						onClick={toggleUnlockModal}
						role='button'
						tabIndex={0}
						onKeyPress={toggleUnlockModal}
						aria-label='Unlock Feature'
					/>
				</div>
				{error && (
					<div className='error-message'>{error}</div>
				)}
			</header>
			{isUnlockModalOpen && (
				<Unlock
					onClose={toggleUnlockModal}
					onUnlock={handleUnlock}
					error={unlockError}
				/>
			)}
		</>
	);
};

export default Header;
