describe('Header Component', () => {
	it('should toggle unlock modal', () => {
		cy.visit('/');
		cy.get('[aria-label="Unlock Feature"]').click();
		cy.contains('Unlock Feature').should('be.visible');
		cy.get('.unlock-close').click();
		cy.contains('Unlock Feature').should('not.exist');
	});

	it('should switch tabs', () => {
		cy.visit('/');
		cy.get('[aria-label="jsPrinciples Tab"]').click();
		cy.get('.tab.active').should('contain', 'jsPrinciples');
		cy.get('[aria-label="Reviewsheet Tab"]').click();
		cy.get('.tab.active').should('contain', 'Reviewsheet');
	});

	it('should switch tabs', () => {
		cy.visit('/');
		cy.get('[aria-label="tsPrinciples Tab"]').click();
		cy.get('.tab.active').should('contain', 'tsPrinciples');
		cy.get('[aria-label="Reviewsheet Tab"]').click();
		cy.get('.tab.active').should('contain', 'Reviewsheet');
	});

	it('should search topics', () => {
		cy.visit('/');
		cy.get('[aria-label="Search"]').type('React');
		cy.get('.autocomplete-dropdown').should('be.visible');
		cy.get('.autocomplete-dropdown li').first().click();
		cy.get('[aria-label="Search"]').should(
			'have.value',
			'React'
		);
	});

	it('should filter topics', () => {
		cy.visit('/');
		cy.get('.filter-selected').click();
		cy.contains('Alphabetical').click();
		cy.get('.filter-selected').should(
			'contain',
			'Alphabetical'
		);
	});
});
