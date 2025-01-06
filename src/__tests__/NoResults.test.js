import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AppContext } from '../Context/AppContext';
import NoResults from '../Components/NoResults';

const mockContext = {
	resetResults: jest.fn(),
	explorePopularSearches: jest.fn(),
};

describe('NoResults Component', () => {
	it('renders without crashing', () => {
		render(
			<AppContext.Provider value={mockContext}>
				<NoResults />
			</AppContext.Provider>
		);
		expect(screen.getByText('No Results Found')).toBeInTheDocument();
	});

	it('calls resetResults on button click', () => {
		render(
			<AppContext.Provider value={mockContext}>
				<NoResults />
			</AppContext.Provider>
		);
		const button = screen.getByText('Reset results');
		fireEvent.click(button);
		expect(mockContext.resetResults).toHaveBeenCalled();
	});
});
