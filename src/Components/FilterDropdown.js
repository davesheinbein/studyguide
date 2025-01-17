import React, { useContext, useEffect, useRef } from 'react';
import '../styles/FilterDropdown/FilterDropdown.css';
import { AppContext } from '../Context/AppContext';

const FilterDropdown = ({ onFilterChange }) => {
	const {
		filter,
		setFilter,
		error,
		setError,
		isOpen,
		setIsOpen,
	} = useContext(AppContext);
	const dropdownRef = useRef(null);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (selectedFilter) => {
		if (
			['Default', 'Alphabetical', 'Category'].includes(
				selectedFilter
			)
		) {
			setError(null);
			setFilter(selectedFilter);
			onFilterChange(selectedFilter);
			setIsOpen(false);
		} else {
			setError('Invalid filter selected.');
		}
	};

	const handleClickOutside = (event) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target)
		) {
			setIsOpen(false);
		}
	};

	const handleEscapeKey = (event) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscapeKey);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, []);

	return (
		<div className='filter-dropdown' ref={dropdownRef}>
			<div
				className='filter-selected'
				onClick={handleToggle}
				role='button'
				tabIndex={0}
				onKeyPress={handleToggle}
				aria-haspopup='listbox'
			>
				{filter}
			</div>
			{isOpen && (
				<div className='filter-options' role='listbox'>
					<div
						onClick={() => handleOptionClick('Default')}
						role='option'
						tabIndex={0}
						onKeyPress={() => handleOptionClick('Default')}
					>
						Default
					</div>
					<div
						onClick={() =>
							handleOptionClick('Alphabetical')
						}
						role='option'
						tabIndex={0}
						onKeyPress={() =>
							handleOptionClick('Alphabetical')
						}
					>
						Alphabetical
					</div>
					<div
						onClick={() => handleOptionClick('Category')}
						role='option'
						tabIndex={0}
						onKeyPress={() => handleOptionClick('Category')}
					>
						Category
					</div>
				</div>
			)}
			{error && (
				<div className='error-message'>{error}</div>
			)}
		</div>
	);
};

export default FilterDropdown;
