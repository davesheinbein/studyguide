describe('Footer Component', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should contain correct links', () => {
		cy.get('a[aria-label="GitHub"]').should('have.attr', 'href', 'https://github.com/davesheinbein/');
		cy.get('a[aria-label="LinkedIn"]').should('have.attr', 'href', 'https://linkedin.com/in/david-sheinbein');
		cy.get('a[aria-label="Personal Website"]').should('have.attr', 'href', 'https://davidsheinbeinengineer.com/');
	});

	it('should toggle dark mode', () => {
		cy.get('input[type="checkbox"]').check();
		cy.get('body').should('have.class', 'dark-mode');

		cy.get('input[type="checkbox"]').uncheck();
		cy.get('body').should('not.have.class', 'dark-mode');
	});
});
