import React, { useState, useEffect } from 'react';
import '../styles/Unlock/Unlock.css';

const Unlock = ({ onClose, onUnlock, error }) => {
	const [code, setCode] = useState('');

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener(
				'keydown',
				handleKeyDown
			);
		};
	}, [onClose]);

	const handleUnlock = () => {
		onUnlock(code);
	};

	return (
		<div className='unlock-modal'>
			<div className='unlock-modal-content'>
				<span className='unlock-close' onClick={onClose}>
					&times;
				</span>
				<h2>Unlock Feature</h2>
				<div className='unlock-input-container'>
					<input
						type='text'
						placeholder='Enter code'
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
					<button onClick={handleUnlock}>Unlock</button>
				</div>
				{error && (
					<p className='unlock-error-message'>{error}</p>
				)}
			</div>
		</div>
	);
};

export default Unlock;
