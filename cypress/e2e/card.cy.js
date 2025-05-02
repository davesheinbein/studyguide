describe('Card Component', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should render cards based on active tab', () => {
		cy.get('.tab').contains('Reviewsheet').click();
		cy.get('.card-item').should(
			'have.length.greaterThan',
			0
		);

		cy.get('.tab').contains('LeetCode').click();
		cy.get('.card-item').should(
			'have.length.greaterThan',
			0
		);

		cy.get('.tab').contains('jsPrinciples').click();
		cy.get('.card-item').should(
			'have.length.greaterThan',
			0
		);
	});

	it('should filter cards based on search query', () => {
		const query = 'javascript';
		cy.get(
			'input[placeholder="Search by topic, category, or ID..."]'
		).type(query);
		cy.get('.card-item').each(($el) => {
			cy.wrap($el).should('contain.text', query);
		});
	});

	it('should expand and collapse card on click', () => {
		cy.get('.card-item').first().click();
		cy.get('.card-item.expanded').should('be.visible');

		cy.get('.close-button').click();
		cy.get('.card-item.expanded').should('not.exist');
	});
});
