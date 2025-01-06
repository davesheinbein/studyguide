describe('FilterDropdown Component', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should open and close filter dropdown', () => {
		cy.get('.filter-selected').click();
		cy.get('.filter-options').should('be.visible');

		cy.get('body').click(0, 0); // Click outside to close
		cy.get('.filter-options').should('not.exist');
	});

	it('should select a filter option', () => {
		cy.get('.filter-selected').click();
		cy.get('.filter-options div').contains('Alphabetical').click();
		cy.get('.filter-selected').should('contain', 'Alphabetical');
	});

	it('should display error message for invalid filter', () => {
		cy.get('.filter-selected').click();
		cy.get('.filter-options div').contains('Invalid').click();
		cy.get('.error-message').should('contain', 'Invalid filter selected.');
	});
});
