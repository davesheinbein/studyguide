describe('App Component', () => {
	it('should render the Header component', () => {
		cy.visit('/');
		cy.contains('Header').should('be.visible');
	});

	it('should render the Footer component', () => {
		cy.visit('/');
		cy.contains('Footer').should('be.visible');
	});

	it('should navigate to Popular Searches page', () => {
		cy.visit('/');
		cy.contains('Popular Searches').click();
		cy.url().should('include', '/popular-searches');
		cy.contains('Popular Searches').should('be.visible');
	});

	it('should show NoResults component when dataLoadError is true', () => {
		// Mock the context to simulate dataLoadError
		cy.visit('/', {
			onBeforeLoad(win) {
				win.React = React;
				win.React.useContext = () => ({
					error: null,
					dataLoadError: true,
				});
			},
		});
		cy.contains('No Results').should('be.visible');
	});
});
