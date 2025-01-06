import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppProvider } from '../Context/AppContext';
import FilterDropdown from '../Components/FilterDropdown';

test('renders FilterDropdown component and changes filter', () => {
	const mockOnFilterChange = jest.fn();
	const { getByText, queryByText } = render(
		<AppProvider>
			<FilterDropdown onFilterChange={mockOnFilterChange} />
		</AppProvider>
	);

	const selectedFilter = getByText('Default');
	fireEvent.click(selectedFilter);

	const alphabeticalOption = getByText('Alphabetical');
	fireEvent.click(alphabeticalOption);

	expect(mockOnFilterChange).toHaveBeenCalledWith('Alphabetical');
	expect(queryByText('Alphabetical')).toBeInTheDocument();
});
