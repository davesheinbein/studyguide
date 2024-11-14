import { useState } from 'react';
import './App.css';
import Card from './Components/Card';
import Header from './Components/Header';

const App = () => {
	const [activeTab, setActiveTab] = useState('reviewsheet');

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div className='app'>
			<Header onTabClick={handleTabClick} />
			<Card activeTab={activeTab} />
		</div>
	);
};

export default App;
