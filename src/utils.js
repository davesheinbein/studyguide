export function filterData(data, searchQuery, filter) {
	let filteredData = data;

	if (searchQuery) {
		filteredData = searchData(filteredData, searchQuery);
	}

	switch (filter) {
		case 'Alphabetical':
			filteredData = filteredData.sort((a, b) =>
				a.topic.localeCompare(b.topic)
			);
			break;
		case 'Category':
			filteredData = filteredData.sort((a, b) =>
				a.category.localeCompare(b.category)
			);
			break;
		default:
			break;
	}

	return filteredData;
}

export function searchData(data, query) {
	return data.filter(
		(item) =>
			item.topic
				.toLowerCase()
				.includes(query.toLowerCase()) ||
			item.explanation
				.toLowerCase()
				.includes(query.toLowerCase())
	);
}
