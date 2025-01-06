import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../Components/NotFound';

describe('NotFound Component', () => {
	it('renders without crashing', () => {
		render(<NotFound />);
		expect(screen.getByText('404')).toBeInTheDocument();
		expect(screen.getByText('Page Not Found')).toBeInTheDocument();
	});
});
