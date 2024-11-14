import React, { useEffect, useState } from 'react';
import '../styles/Card/Card.css';
import cheatsheetData from '../data/cheatsheet.json';

const Card = () => {
	const [cheatsheet, setCheatsheet] = useState([]);
	const [expandedIndex, setExpandedIndex] = useState(null);

	useEffect(() => {
		setCheatsheet(cheatsheetData);
	}, []);

	const handleCardClick = (index) => {
		setExpandedIndex(
			expandedIndex === index ? null : index
		);
	};

	const handleCloseClick = () => {
		setExpandedIndex(null);
	};

	return (
		<div className='card'>
			<div className='card-grid'>
				{cheatsheet.map((item, index) => (
					<div
						key={index}
						className={`card-item ${
							expandedIndex === index ? 'expanded' : ''
						}`}
						onClick={() => handleCardClick(index)}
					>
						{expandedIndex === index && (
							<button
								className='close-button'
								onClick={handleCloseClick}
							>
								&times;
							</button>
						)}
						<div className='card-item-topic'>
							<div className='card-item-topic-text'>
								{item.topic}
							</div>
						</div>
						<div className='card-item-code'>
							<pre>{item.code}</pre>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Card;
