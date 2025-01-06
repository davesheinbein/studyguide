describe('NotFound Component', () => {
	it('should display 404 page for invalid URL', () => {
		cy.visit('/invalid-url', { failOnStatusCode: false });
		cy.get('.not-found').should('be.visible');
		cy.get('h2').should('contain', '404');
		cy.get('h1').should('contain', 'Page Not Found');
	});
});
