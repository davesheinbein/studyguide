describe('Header Component', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should navigate to different tabs', () => {
		cy.get('.tab').contains('jsPrinciples').click();
		cy.get('.tab')
			.contains('jsPrinciples')
			.should('have.class', 'active');

		cy.get('.tab').contains('tsPrinciples').click();
		cy.get('.tab')
			.contains('tsPrinciples')
			.should('have.class', 'active');

		cy.get('.tab').contains('Reviewsheet').click();
		cy.get('.tab')
			.contains('Reviewsheet')
			.should('have.class', 'active');
	});

	it('should open unlock modal on lock icon click', () => {
		cy.get('.lock-icon').click();
		cy.get('.unlock-modal').should('be.visible');
	});
});
