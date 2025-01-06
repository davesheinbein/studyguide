describe('Unlock Component', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.get('.lock-icon').click();
	});

	it('should open the unlock modal', () => {
		cy.get('.unlock-modal').should('be.visible');
	});

	it('should close the unlock modal on close button click', () => {
		cy.get('.unlock-close').click();
		cy.get('.unlock-modal').should('not.exist');
	});

	it('should display an error message for incorrect code', () => {
		cy.get('input[placeholder="Enter code"]').type('wrongcode');
		cy.get('button').contains('Unlock').click();
		cy.get('.unlock-error-message').should('contain', 'Incorrect code. Please try again.');
	});

	it('should unlock with correct code', () => {
		const validCode = Cypress.env('VALID_CODE');
		cy.get('input[placeholder="Enter code"]').type(validCode);
		cy.get('button').contains('Unlock').click();
		cy.get('.unlock-modal').should('not.exist');
		cy.get('.lock-icon').should('have.class', 'fa-unlock');
	});
});
