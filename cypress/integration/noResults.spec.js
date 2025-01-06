describe('NoResults Component', () => {
  it('should display no results message', () => {
    cy.visit('/');
    cy.get('[aria-label="Search"]').type('NonExistentTopic');
    cy.contains('No Results Found').should('be.visible');
  });

  it('should reset results', () => {
    cy.visit('/');
    cy.get('[aria-label="Search"]').type('NonExistentTopic');
    cy.contains('No Results Found').should('be.visible');
    cy.contains('Reset results').click();
    cy.get('[aria-label="Search"]').should('have.value', '');
  });

  it('should explore popular searches', () => {
    cy.visit('/');
    cy.get('[aria-label="Search"]').type('NonExistentTopic');
    cy.contains('No Results Found').should('be.visible');
    cy.contains('Explore Popular Searches').click();
    cy.contains('Popular Searches').should('be.visible');
  });
});
