import React, { useEffect, useContext } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '../styles/prism-custom.css';
import '../styles/Card/Card.css';
import reviewsheetData from '../data/reviewsheet.json';
import leetcodeData from '../data/leetcode.json';
import principlesData from '../data/principles.json';
import { AppContext } from '../Context/AppContext';
import { filterData } from '../utils';
import NoResults from './NoResults';
import { useLocation, useNavigate } from 'react-router-dom';

const Card = () => {
	const {
		activeTab,
		searchQuery,
		filter,
		reviewsheet,
		leetcode,
		principles,
		filteredData,
		error,
		expandedCard,
		setReviewsheet,
		setLeetcode,
		setPrinciples,
		setFilteredData,
		setError,
		setExpandedCard,
	} = useContext(AppContext);
	const location = useLocation();
	const navigate = useNavigate();

	const originalData = {
		reviewsheet: [...reviewsheetData],
		leetcode: [...leetcodeData],
		principles: [...principlesData],
	};

	useEffect(() => {
		try {
			setReviewsheet([...reviewsheetData]);
			setLeetcode([...leetcodeData]);
			setPrinciples([...principlesData]);
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

			let filtered;
			if (filter === 'Default') {
				filtered = [...originalData[activeTab]];
			} else {
				filtered = filterData(data, searchQuery, filter);
			}
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

	useEffect(() => {
		if (
			location.state?.openCard &&
			location.state?.expandCard &&
			(!expandedCard ||
				expandedCard.topic !== location.state.openCard)
		) {
			const topic = location.state.openCard;
			const card = filteredData.find(
				(item) => item.topic === topic
			);
			if (card) {
				createCardClone(card);
				navigate(location.pathname, {
					state: {
						openCard: topic,
						expandCard: false,
					},
				});
			}
		}
	}, [location.state, filteredData, expandedCard]);

	useEffect(() => {
		const handleEscapeKey = (event) => {
			if (event.key === 'Escape') {
				if (expandedCard) {
					const explanation =
						expandedCard.cardClone.querySelector(
							'.card-item-explanation'
						);
					if (explanation.classList.contains('active')) {
						explanation.classList.remove('active');
						explanation.style.maxHeight = '0';
						explanation.style.height = '0';
					} else {
						expandedCard.cardClone.remove();
						expandedCard.overlay.remove();
						setExpandedCard(null);
					}
				}
			}
		};

		document.addEventListener('keydown', handleEscapeKey);
		return () => {
			document.removeEventListener(
				'keydown',
				handleEscapeKey
			);
		};
	}, [expandedCard]);

	const createCardClone = (item) => {
		// Close the currently expanded card if there is one
		if (expandedCard) {
			expandedCard.cardClone.remove();
			expandedCard.overlay.remove();
		}

		const cardClone = document.createElement('div');
		cardClone.className = 'card-item expanded';
		cardClone.innerHTML = `
			<button class='close-button'>&times;</button><div class='card-item-topic'> <div class='card-item-topic-text'> ${item.topic} </div> <div class='card-item-topic-category'> ${item.category} </div></div><div class='card-item-code'> <pre><code class='language-javascript'> ${item.code} </code></pre></div><div class='card-item-explanation'> <div class='card-item-explanation-title'> Explanation </div> <div class='card-item-explanation-text'> ${item.explanation} </div> <button class='close-explanation-button'>&#9660;</button></div><button class='explanation-button'>?</button>
		`;

		const overlay = document.createElement('div');
		overlay.className = 'card-overlay active';
		overlay.addEventListener('click', () => {
			cardClone.remove();
			overlay.remove();
			setExpandedCard(null);
		});

		document.body.appendChild(overlay);
		document.body.appendChild(cardClone);

		const closeButton =
			cardClone.querySelector('.close-button');
		closeButton.addEventListener('click', () => {
			cardClone.remove();
			overlay.remove();
			setExpandedCard(null);
		});

		const explanationButton = cardClone.querySelector(
			'.explanation-button'
		);
		const explanation = cardClone.querySelector(
			'.card-item-explanation'
		);
		explanation.classList.remove('active');
		explanation.style.maxHeight = '0';
		explanation.style.height = '0';
		explanationButton.addEventListener('click', () => {
			explanation.classList.toggle('active');
			explanation.style.maxHeight =
				explanation.classList.contains('active')
					? 'none'
					: '0';
			explanation.style.height =
				explanation.classList.contains('active')
					? 'auto'
					: '0';
		});

		const closeExplanationButton = cardClone.querySelector(
			'.close-explanation-button'
		);
		closeExplanationButton.addEventListener('click', () => {
			explanation.classList.remove('active');
			explanation.style.maxHeight = '0';
			explanation.style.height = '0';
		});

		Prism.highlightAll();

		// Set the new expanded card
		setExpandedCard({ cardClone, overlay });
	};

	const handleCardClick = (index, item) => {
		createCardClone(item);
	};

	const handleDragStart = (event, index) => {
		event.dataTransfer.setData('text/plain', index);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event, targetIndex) => {
		event.preventDefault();
		const draggedIndex =
			event.dataTransfer.getData('text/plain');
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
				onDragOver={handleDragOver}
				onDrop={(event) => handleDrop(event, index)}
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
			{filteredData.length === 0 ? (
				<NoResults />
			) : (
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
			)}
		</>
	);
};

export default Card;
