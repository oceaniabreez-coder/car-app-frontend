describe('App Home Page', () => {
  it("should display 'John's Car Collection' on load", () => {
    cy.visit('/');
    cy.contains("John's Car Collection").should('be.visible');
  });
});


describe('Car Search Filter', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should filter cars by Origin = "usa"', () => {
    
    cy.get('input[formcontrolname="origin"]').first().type('usa');


    // Click the Search button
    cy.contains('button', 'Search').click();

    // Wait for data to load (if your app loads async, adjust the wait or use intercept)
    cy.wait(1000);

     cy.get('.card', { timeout: 10000 })
      .should('exist')                      // ensures at least one exists
      .and('have.length.greaterThan', 0)    // confirms count > 0
      .and('be.visible'); 
  });
});