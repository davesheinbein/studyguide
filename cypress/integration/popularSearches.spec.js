describe('PopularSearches Component', () => {
  it('should display popular searches', () => {
    cy.visit('/');
    cy.contains('Popular Searches').should('be.visible');
    cy.get('.popular-searches__list-item').should('have.length.greaterThan', 0);
  });

  it('should search popular topics', () => {
    cy.visit('/');
    cy.get('.search-input').type('React');
    cy.get('.popular-searches__list-item').should('contain', 'React');
  });

  it('should navigate to topic on click', () => {
    cy.visit('/');
    cy.get('.popular-searches__list-item').first().click();
    cy.url().should('include', '/');
  });

  it('should go back to home page', () => {
    cy.visit('/');
    cy.get('.go-back-button').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
