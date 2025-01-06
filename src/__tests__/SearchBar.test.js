import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AppContext } from '../Context/AppContext';
import SearchBar from '../Components/SearchBar';

const mockContext = {
	searchQuery: '',
	setSearchQuery: jest.fn(),
	error: null,
	setError: jest.fn(),
	activeTopics: ['React', 'JavaScript', 'CSS'],
	filteredTopics: [],
	setFilteredTopics: jest.fn(),
	isFocused: false,
	setIsFocused: jest.fn(),
};

describe('SearchBar Component', () => {
	it('renders without crashing', () => {
		render(
			<AppContext.Provider value={mockContext}>
				<SearchBar onSearchChange={jest.fn()} />
			</AppContext.Provider>
		);
		expect(screen.getByPlaceholderText('Search by topic, category, or ID...')).toBeInTheDocument();
	});

	it('updates search query on input change', () => {
		render(
			<AppContext.Provider value={mockContext}>
				<SearchBar onSearchChange={jest.fn()} />
			</AppContext.Provider>
		);
		const input = screen.getByPlaceholderText('Search by topic, category, or ID...');
		fireEvent.change(input, { target: { value: 'React' } });
		expect(mockContext.setSearchQuery).toHaveBeenCalledWith('React');
	});
});
