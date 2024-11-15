import { useState } from 'react';
import './App.css';
import Card from './Components/Card';
import Header from './Components/Header';

const App = () => {
	const [activeTab, setActiveTab] = useState('reviewsheet');
	const [searchQuery, setSearchQuery] = useState('');
	const [filter, setFilter] = useState('alphabetical');

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const handleSearch = (query, tab) => {
		setSearchQuery(query);
	};

	const handleFilterChange = (selectedFilter) => {
		setFilter(selectedFilter);
	};

	return (
		<div className='app'>
			<Header
				onTabClick={handleTabClick}
				onSearch={handleSearch}
				onFilterChange={handleFilterChange}
			/>
			<Card
				activeTab={activeTab}
				searchQuery={searchQuery}
				filter={filter}
			/>
		</div>
	);
};

export default App;
