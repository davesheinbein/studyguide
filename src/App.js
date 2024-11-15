import { useState } from 'react';
import './App.css';
import Card from './Components/Card';
import Header from './Components/Header';

const App = () => {
	const [activeTab, setActiveTab] = useState('reviewsheet');
	const [searchQuery, setSearchQuery] = useState('');

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const handleSearch = (query, tab) => {
		setSearchQuery(query);
	};

	return (
		<div className='app'>
			<Header onTabClick={handleTabClick} onSearch={handleSearch} />
			<Card activeTab={activeTab} searchQuery={searchQuery} />
		</div>
	);
};

export default App;
