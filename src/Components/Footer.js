import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGithub,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../Context/AppContext';
import '../styles/Footer/Footer.css';

const Footer = () => {
	const { darkMode, toggleDarkMode } =
		useContext(AppContext);
	const currentYear = new Date().getFullYear();

	return (
		<footer className='footer'>
			<div className='copyright'>
				&copy; {currentYear} David Sheinbein
			</div>
			<div className='links'>
				<a
					href='https://github.com/davesheinbein/'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='GitHub'
				>
					<FontAwesomeIcon icon={faGithub} />
				</a>
				<a
					href='https://linkedin.com/in/david-sheinbein'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='LinkedIn'
				>
					<FontAwesomeIcon icon={faLinkedin} />
				</a>
				<a
					href='https://davidsheinbeinengineer.com/'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='Personal Website'
				>
					<FontAwesomeIcon icon={faGlobe} />
				</a>
				<label className='switch'>
					<input
						type='checkbox'
						checked={darkMode}
						onChange={toggleDarkMode}
						aria-label='Toggle Dark Mode'
					/>
					<span className='slider round'></span>
				</label>
			</div>
		</footer>
	);
};

export default Footer;
