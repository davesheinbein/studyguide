import React, { useContext, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';
import '../styles/PopularSearches/PopularSearches.css';
import { useNavigate } from 'react-router-dom';

const PopularSearches = () => {
	const {
		activeTab,
		topics,
		handleSearch,
		handleTabClick,
		searchQuery,
		setSearchQuery,
		filteredTopics,
		setFilteredTopics,
		expandCard,
		setExpandCard,
	} = useContext(AppContext);

	const navigate = useNavigate();

	useEffect(() => {
		setFilteredTopics(
			topics.filter((topic) =>
				topic
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			)
		);
	}, [searchQuery, topics]);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleTopicClick = (topic) => {
		handleSearch(topic);
		handleTabClick(activeTab);
		setExpandCard(true);
		navigate('/', {
			state: { openCard: topic, expandCard: true },
		});
	};

	const handleGoBack = () => {
		navigate('/');
	};

	return (
		<div className='popular-searches'>
			<h2>Popular Searches</h2>
			<div className='search-input-container'>
				<input
					type='text'
					placeholder='Search popular topics...'
					value={searchQuery}
					onChange={handleSearchChange}
					className='search-input'
				/>
			</div>
			<button
				onClick={handleGoBack}
				className='go-back-button'
			>
				Go Back
			</button>
			<ul className='popular-searches__list'>
				{filteredTopics.map((topic, index) => (
					<li
						key={index}
						onClick={() => handleTopicClick(topic)}
						className='popular-searches__list-item'
					>
						{topic}
					</li>
				))}
			</ul>
		</div>
	);
};

export default PopularSearches;
