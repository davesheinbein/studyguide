import React, { useContext } from 'react';
import '../styles/NoResults/NoResults.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../App';

const NoResults = () => {
	const { resetResults, explorePopularSearches } = useContext(AppContext);

	return (
		<div className='no-results'>
			<FontAwesomeIcon icon={faSearch} className='icon' />
			<h1 className='heading'>No Results Found</h1>
			<p className='message'>
				We couldn’t find anything that matches your search.
				Try refining your filters or searching for something
				else.
			</p>
			<div className='actions'>
				<button className='button' onClick={resetResults}>
					Reset results
				</button>
				<button
					className='button'
					onClick={explorePopularSearches}
				>
					Explore Popular Searches
				</button>
			</div>
		</div>
	);
};

export default NoResults;
