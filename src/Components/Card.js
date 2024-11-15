import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '../styles/Card/Card.css';
import '../styles/prism-custom.css'; // Import custom CSS
import reviewsheetData from '../data/reviewsheet.json';
import leetcodeData from '../data/leetcode.json';
import principlesData from '../data/principles.json'; // Import principles data

const Card = ({ activeTab, searchQuery, filter }) => {
	const [reviewsheet, setReviewsheet] = useState([]);
	const [leetcode, setLeetcode] = useState([]);
	const [principles, setPrinciples] = useState([]); // State for principles
	const [filteredData, setFilteredData] = useState([]);
	const [expandedIndex, setExpandedIndex] = useState(null);

	useEffect(() => {
		setReviewsheet(reviewsheetData);
		setLeetcode(leetcodeData);
		setPrinciples(principlesData);
		Prism.highlightAll();
	}, []);

	useEffect(() => {
		const data = {
			reviewsheet,
			leetcode,
			principles,
		}[activeTab];

		let filtered = data.filter((item) =>
			item.topic.toLowerCase().includes(searchQuery.toLowerCase())
		);

		if (filter === 'alphabetical') {
			filtered = filtered.sort((a, b) =>
				a.topic.localeCompare(b.topic)
			);
		} else if (filter === 'category') {
			filtered = filtered.sort((a, b) => {
				if (a.category === b.category) {
					return a.topic.localeCompare(b.topic);
				}
				return a.category.localeCompare(b.category);
			});
		}

		setFilteredData(filtered);
	}, [searchQuery, activeTab, reviewsheet, leetcode, principles, filter]);

	useEffect(() => {
		Prism.highlightAll();
	}, [filteredData]);

	const createCardClone = (item) => {
		const cardClone = document.createElement('div');
		cardClone.className = 'card-item expanded';
		cardClone.innerHTML = `
			<button class='close-button'>&times;</button>
			<div class='card-item-topic'>
				<div class='card-item-topic-text'>${item.topic}</div>
			</div>
			<div className='card-item-code'>
				<pre><code class='language-javascript'>${item.code}</code></pre>
			</div>
		`;

		const overlay = document.createElement('div');
		overlay.className = 'card-overlay active';
		overlay.addEventListener('click', () => {
			cardClone.remove();
			overlay.remove();
		});

		document.body.appendChild(overlay);
		document.body.appendChild(cardClone);

		const closeButton =
			cardClone.querySelector('.close-button');
		closeButton.addEventListener('click', () => {
			cardClone.remove();
			overlay.remove();
		});

		Prism.highlightAll();
	};

	const handleCardClick = (index, item) => {
		createCardClone(item);
	};

	const renderCards = (data) => {
		return data.map((item, index) => (
			<div
				key={index}
				className='card-item'
				onClick={() => handleCardClick(index, item)}
			>
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
		));
	};

	return (
		<>
			{activeTab === 'reviewsheet' && (
				<div className='card card-A'>
					<div className='card-grid'>
						{renderCards(filteredData)}
					</div>
				</div>
			)}
			{activeTab === 'leetcode' && (
				<div className='card card-B'>
					<div className='card-grid'>
						{renderCards(filteredData)}
					</div>
				</div>
			)}
			{activeTab === 'principles' && (
				<div className='card card-C'>
					<div className='card-grid'>
						{renderCards(filteredData)}
					</div>
				</div>
			)}
		</>
	);
};

export default Card;
