import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppProvider } from '../Context/AppContext';
import Footer from '../Components/Footer';

test('renders Footer component and toggles dark mode', () => {
	const { getByLabelText } = render(
		<AppProvider>
			<Footer />
		</AppProvider>
	);

	const toggleSwitch = getByLabelText('Toggle Dark Mode');
	fireEvent.click(toggleSwitch);

	expect(toggleSwitch.checked).toBe(true);
});
