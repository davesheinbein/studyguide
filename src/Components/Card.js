import React, {
	useEffect,
	useState,
	useContext,
} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '../styles/prism-custom.css';
import '../styles/Card/Card.css';
import reviewsheetData from '../data/reviewsheet.json';
import leetcodeData from '../data/leetcode.json';
import principlesData from '../data/principles.json';
import { AppContext } from '../App';
import { filterData } from '../utils';

const Card = () => {
	const { activeTab, searchQuery, filter } =
		useContext(AppContext);
	const [reviewsheet, setReviewsheet] = useState([]);
	const [leetcode, setLeetcode] = useState([]);
	const [principles, setPrinciples] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		try {
			setReviewsheet(reviewsheetData);
			setLeetcode(leetcodeData);
			setPrinciples(principlesData);
			Prism.highlightAll();
		} catch (err) {
			setError('Failed to load data.');
		}
	}, []);

	useEffect(() => {
		try {
			const dataMap = { reviewsheet, leetcode, principles };
			const data = dataMap[activeTab];

			if (!data) {
				throw new Error('Invalid tab selected.');
			}

			const filtered = filterData(
				data,
				searchQuery,
				filter
			);
			setFilteredData(filtered);
		} catch (err) {
			setError('Failed to filter data.');
		}
	}, [
		searchQuery,
		activeTab,
		reviewsheet,
		leetcode,
		principles,
		filter,
	]);

	useEffect(() => {
		Prism.highlightAll();
	}, [filteredData]);

	const createCardClone = (item) => {
		const cardClone = document.createElement('div');
		cardClone.className = 'card-item expanded';
		cardClone.innerHTML = `
			<button class='close-button'>&times;</button>
			<div class='card-item-topic'>
				<div class='card-item-topic-text'>
					${item.topic}
				</div>
			</div>
			<div class='card-item-code'>
				<pre><code class='language-javascript'>
					${item.code}
				</code></pre>
			</div>
			<div class='card-item-explanation'>
				<div class='card-item-explanation-title'>
					Explanation
				</div>
				<div class='card-item-explanation-text'>
					${item.explanation}
				</div>
				<button class='close-explanation-button'>&#9660;</button>
			</div>
			<button class='explanation-button'>?</button>
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

		const explanationButton = cardClone.querySelector(
			'.explanation-button'
		);
		const explanation = cardClone.querySelector(
			'.card-item-explanation'
		);
		explanationButton.addEventListener('click', () => {
			explanation.classList.toggle('active');
		});

		const closeExplanationButton = cardClone.querySelector(
			'.close-explanation-button'
		);
		closeExplanationButton.addEventListener('click', () => {
			explanation.classList.remove('active');
		});

		Prism.highlightAll();
	};

	const handleCardClick = (index, item) => {
		createCardClone(item);
	};

	const handleDragStart = (event, index) => {
		event.dataTransfer.setData('text/plain', index);
	};

	const handleDrop = (event) => {
		const draggedIndex =
			event.dataTransfer.getData('text/plain');
		const targetIndex = event.target.dataset.index;

		if (draggedIndex !== targetIndex) {
			const updatedData = [...filteredData];
			const [draggedItem] = updatedData.splice(
				draggedIndex,
				1
			);
			updatedData.splice(targetIndex, 0, draggedItem);
			setFilteredData(updatedData);
		}
	};

	const renderCards = (data) => {
		return data.map((item, index) => (
			<div
				key={index}
				className='card-item'
				onClick={() => handleCardClick(index, item)}
				draggable
				onDragStart={(event) =>
					handleDragStart(event, index)
				}
				onDrop={handleDrop}
				data-index={index}
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
				<div className='card-item-explanation'>
					<div className='card-item-explanation-title'>
						Explanation
					</div>
					<div className='card-item-explanation-text'>
						{item.explanation}
					</div>
				</div>
				<div className='card-item-category'>
					{item.category}
				</div>
			</div>
		));
	};

	return (
		<>
			{error && (
				<div className='error-message'>{error}</div>
			)}
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
