describe('SearchBar Component', () => {
  it('should display search results', () => {
    cy.visit('/');
    cy.get('[aria-label="Search"]').type('JavaScript');
    cy.get('.autocomplete-dropdown').should('be.visible');
    cy.get('.autocomplete-dropdown li').should('have.length.greaterThan', 0);
  });

  it('should clear search input', () => {
    cy.visit('/');
    cy.get('[aria-label="Search"]').type('JavaScript');
    cy.get('[aria-label="Clear search"]').click();
    cy.get('[aria-label="Search"]').should('have.value', '');
  });

  it('should show error for long search query', () => {
    cy.visit('/');
    cy.get('[aria-label="Search"]').type('a'.repeat(101));
    cy.get('#search-error').should('contain', 'Search query is too long.');
  });
});
