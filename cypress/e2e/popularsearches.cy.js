describe('PopularSearches Component', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.get('.tab').contains('Popular Searches').click();
	});

	it('should update search query on input change', () => {
		const query = 'test';
		cy.get('input[placeholder="Search popular topics..."]').type(query);
		cy.get('input[placeholder="Search popular topics..."]').should('have.value', query);
	});

	it('should navigate to home on Go Back button click', () => {
		cy.get('.go-back-button').click();
		cy.url().should('eq', Cypress.config().baseUrl + '/');
	});

	it('should filter topics based on search query', () => {
		const query = 'javascript';
		cy.get('input[placeholder="Search popular topics..."]').type(query);
		cy.get('.popular-searches__list-item').each(($el) => {
			cy.wrap($el).should('contain.text', query);
		});
	});
});
