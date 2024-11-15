import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '../styles/Card/Card.css';
import '../styles/prism-custom.css'; // Import custom CSS
import reviewsheetData from '../data/reviewsheet.json';
import leetcodeData from '../data/leetcode.json';
import principlesData from '../data/principles.json'; // Import principles data

const Card = ({ activeTab }) => {
	const [reviewsheet, setReviewsheet] = useState([]);
	const [leetcode, setLeetcode] = useState([]);
	const [principles, setPrinciples] = useState([]); // State for principles
	const [expandedIndex, setExpandedIndex] = useState(null);

	useEffect(() => {
		setReviewsheet(reviewsheetData);
		setLeetcode(leetcodeData);
		setPrinciples(principlesData);
		Prism.highlightAll();
	}, []);

	useEffect(() => {
		Prism.highlightAll();
	}, [expandedIndex, activeTab]);

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
									<pre>
										<code className='language-javascript'>
											{item.code}
										</code>
									</pre>
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
									<pre>
										<code className='language-javascript'>
											{item.code}
										</code>
									</pre>
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
			{activeTab === 'principles' && ( // Add principles tab
				<div className='card card-C'>
					<div className='card-grid'>
						{principles.map((item, index) => (
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
									<pre>
										<code className='language-javascript'>
											{item.code}
										</code>
									</pre>
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
