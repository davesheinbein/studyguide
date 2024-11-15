import React, { useState } from 'react';
import '../styles/FilterDropdown/FilterDropdown.css';

const FilterDropdown = ({ filter, onFilterChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState(null);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (selectedFilter) => {
		if (['Default', 'Alphabetical', 'Category'].includes(selectedFilter)) {
			setError(null);
			onFilterChange(selectedFilter);
			setIsOpen(false);
		} else {
			setError('Invalid filter selected.');
		}
	};

	return (
		<div className='filter-dropdown'>
			<div className='filter-selected' onClick={handleToggle} role='button' tabIndex={0} onKeyPress={handleToggle} aria-haspopup='listbox'>
				{filter}
			</div>
			{isOpen && (
				<div className='filter-options' role='listbox'>
					<div onClick={() => handleOptionClick('Default')} role='option' tabIndex={0} onKeyPress={() => handleOptionClick('Default')}>
						Default
					</div>
					<div onClick={() => handleOptionClick('Alphabetical')} role='option' tabIndex={0} onKeyPress={() => handleOptionClick('Alphabetical')}>
						Alphabetical
					</div>
					<div onClick={() => handleOptionClick('Category')} role='option' tabIndex={0} onKeyPress={() => handleOptionClick('Category')}>
						Category
					</div>
				</div>
			)}
			{error && <div className='error-message'>{error}</div>}
		</div>
	);
};

export default FilterDropdown;
