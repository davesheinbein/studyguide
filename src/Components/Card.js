import React, { useEffect, useState } from 'react';
import '../styles/Card/Card.css';
import reviewsheetData from '../data/reviewsheet.json';
import leetcodeData from '../data/leetcode.json';

const Card = ({ activeTab }) => {
	const [reviewsheet, setReviewsheet] = useState([]);
	const [leetcode, setLeetcode] = useState([]);
	const [expandedIndex, setExpandedIndex] = useState(null);

	useEffect(() => {
		setReviewsheet(reviewsheetData);
		setLeetcode(leetcodeData);
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
		<>
			{activeTab === 'reviewsheet' && (
				<div className='card card-A'>
					<div className='card-grid'>
						{reviewsheet.map((item, index) => (
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
					{expandedIndex !== null && (
						<div
							className='card-overlay active'
							onClick={handleCloseClick}
						></div>
					)}
				</div>
			)}
			{activeTab === 'leetcode' && (
				<div className='card card-B'>
					<div className='card-grid'>
						{leetcode.map((item, index) => (
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
					{expandedIndex !== null && (
						<div
							className='card-overlay active'
							onClick={handleCloseClick}
						></div>
					)}
				</div>
			)}
		</>
	);
};

export default Card;
