describe('NoResults Component', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.get('input[placeholder="Search by topic, category, or ID..."]').type('nonexistentquery');
	});

	it('should display no results message', () => {
		cy.get('.no-results').should('be.visible');
		cy.get('.heading').should('contain', 'No Results Found');
	});

	it('should reset results on Reset results button click', () => {
		cy.get('.button').contains('Reset results').click();
		cy.get('.no-results').should('not.exist');
		cy.get('input[placeholder="Search by topic, category, or ID..."]').should('have.value', '');
	});

	it('should explore popular searches on Explore Popular Searches button click', () => {
		cy.get('.button').contains('Explore Popular Searches').click();
		cy.get('.tab').contains('Popular Searches').should('have.class', 'active');
	});
});
