import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppProvider } from '../Context/AppContext';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Header from '../Components/Header';

test('renders Header component and toggles unlock modal', () => {
	const { getByLabelText, queryByText } = render(
		<BrowserRouter> {/* Wrap with BrowserRouter */}
			<AppProvider>
				<Header />
			</AppProvider>
		</BrowserRouter>
	);

	const lockIcon = getByLabelText('Unlock Feature');
	fireEvent.click(lockIcon);

	expect(queryByText('Unlock Feature')).toBeInTheDocument();
});
