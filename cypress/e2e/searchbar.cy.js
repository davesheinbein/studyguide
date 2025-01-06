describe('SearchBar Component', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should update search query on input change', () => {
		const query = 'test';
		cy.get('input[placeholder="Search by topic, category, or ID..."]').type(query);
		cy.get('input[placeholder="Search by topic, category, or ID..."]').should('have.value', query);
	});

	it('should display error message for long search query', () => {
		const longQuery = 'a'.repeat(101);
		cy.get('input[placeholder="Search by topic, category, or ID..."]').type(longQuery);
		cy.get('.error-message').should('contain', 'Search query is too long.');
	});

	it('should clear search query on clear button click', () => {
		const query = 'test';
		cy.get('input[placeholder="Search by topic, category, or ID..."]').type(query);
		cy.get('.clear-button').click();
		cy.get('input[placeholder="Search by topic, category, or ID..."]').should('have.value', '');
	});
});
