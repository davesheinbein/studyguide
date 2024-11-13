import React, { useEffect, useState } from 'react';
import '../styles/Card/Card.css';
import cheatsheetData from '../data/cheatsheet.json';

const Card = () => {
	const [cheatsheet, setCheatsheet] = useState([]);

	useEffect(() => {
		setCheatsheet(cheatsheetData);
	}, []);

	return (
		<div className='card'>
			<div className='card-grid'>
				{cheatsheet.map((item, index) => (
					<div key={index} className='card-item'>
						<div className='card-item-topic'>
							{item.topic}
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
