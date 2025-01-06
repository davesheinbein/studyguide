describe('Study Guide Application', () => {
    it('should load the home page', () => {
        cy.visit('/');
        cy.contains('Welcome to Study Guide');
    });

    it('should navigate to the about page', () => {
        cy.visit('/');
        cy.get('a[href="/about"]').click();
        cy.url().should('include', '/about');
        cy.contains('About Us');
    });

    it('should display a list of study topics', () => {
        cy.visit('/');
        cy.get('.study-topics').should('be.visible');
        cy.get('.study-topics li').should('have.length.greaterThan', 0);
    });
});
