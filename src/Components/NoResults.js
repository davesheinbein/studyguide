import React from 'react';
import '../styles/NoResults/NoResults.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NoResults = () => {
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
				<button
					className='button'
					onClick={() => window.location.reload()}
				>
					Reset Filters
				</button>
				<button
					className='button'
					onClick={() =>
						(window.location.href = '/popular-searches')
					}
				>
					Explore Popular Searches
				</button>
			</div>
		</div>
	);
};

export default NoResults;
