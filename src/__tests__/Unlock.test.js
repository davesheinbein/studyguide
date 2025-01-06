import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Unlock from '../Components/Unlock';

test('renders Unlock component and handles unlock', () => {
	const onClose = jest.fn();
	const onUnlock = jest.fn();
	const { getByPlaceholderText, getByText } = render(
		<Unlock
			onClose={onClose}
			onUnlock={onUnlock}
			error=''
		/>
	);

	const input = getByPlaceholderText('Enter code');
	const button = getByText('Unlock');

	fireEvent.change(input, {
		target: { value: 'test-code' },
	});
	fireEvent.click(button);

	expect(onUnlock).toHaveBeenCalledWith('test-code');
});
