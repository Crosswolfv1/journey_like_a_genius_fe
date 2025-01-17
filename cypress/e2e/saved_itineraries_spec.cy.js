describe('Saved Itineraries User Flows', () => {
  beforeEach(() => {
    cy.viewport(11440, 900)
    cy.visit('http://localhost:3000/saved-itineraries/guest')
  });

  it('should display the correct title and "Back to Home" button', () => {
    cy.get('h1').should('contain', 'Journey Like a Genius')
    cy.get('button').should('contain', 'Back to home')
  })

  