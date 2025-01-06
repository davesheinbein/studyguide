import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, UNSAFE_NavigationContext } from 'react-router-dom';
import { AppProvider } from '../Context/AppContext';
import App from '../App';

// Opt-in to React Router v7 future flags
const futureFlags = {
	v7_startTransition: true,
	v7_relativeSplatPath: true,
};

test('renders Header component', () => {
	render(
		<Router future={futureFlags}>
			<AppProvider>
				<App />
			</AppProvider>
		</Router>
	);
	const headerElement = screen.getByText(/Header/i);
	expect(headerElement).toBeInTheDocument();
});

test('renders Footer component', () => {
	render(
		<Router future={futureFlags}>
			<AppProvider>
				<App />
			</AppProvider>
		</Router>
	);
	const footerElement = screen.getByText(/Footer/i);
	expect(footerElement).toBeInTheDocument();
});

test('renders NoResults component when dataLoadError is true', () => {
	const mockContext = {
		error: null,
		dataLoadError: true,
	};
	jest
		.spyOn(React, 'useContext')
		.mockImplementation(() => mockContext);

	render(
		<Router future={futureFlags}>
			<AppProvider>
				<App />
			</AppProvider>
		</Router>
	);
	const noResultsElement = screen.getByText(/No Results/i);
	expect(noResultsElement).toBeInTheDocument();
});
