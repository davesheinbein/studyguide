import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AppContext } from '../Context/AppContext';
import PopularSearches from '../Components/PopularSearches';
import { MemoryRouter } from 'react-router-dom';

const mockContext = {
	activeTab: 'all',
	topics: ['React', 'JavaScript', 'CSS'],
	handleSearch: jest.fn(),
	handleTabClick: jest.fn(),
	searchQuery: '',
	setSearchQuery: jest.fn(),
	filteredTopics: ['React', 'JavaScript'],
	setFilteredTopics: jest.fn(),
	expandCard: false,
	setExpandCard: jest.fn(),
};

describe('PopularSearches Component', () => {
	it('renders without crashing', () => {
		render(
			<MemoryRouter>
				<AppContext.Provider value={mockContext}>
					<PopularSearches />
				</AppContext.Provider>
			</MemoryRouter>
		);
		expect(screen.getByText('Popular Searches')).toBeInTheDocument();
	});

	it('updates search query on input change', () => {
		render(
			<MemoryRouter>
				<AppContext.Provider value={mockContext}>
					<PopularSearches />
				</AppContext.Provider>
			</MemoryRouter>
		);
		const input = screen.getByPlaceholderText('Search popular topics...');
		fireEvent.change(input, { target: { value: 'React' } });
		expect(mockContext.setSearchQuery).toHaveBeenCalledWith('React');
	});
});
