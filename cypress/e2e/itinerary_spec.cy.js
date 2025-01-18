describe('Itinerary Component', () => {
  beforeEach(() => {
    cy.viewport(2000, 900)
    cy.visit('http://localhost:3000')
    cy.get('.login-button').click()
    cy.get('.preferences').click()
    cy.get('.city-input').type("New Orleans")
    cy.get('.full-day').click()
    cy.get('.museum').click()
    cy.get('.moderate').click()
    cy.get('.access-false').click()
    cy.get('.small-group').click()
    cy.get('.bbq').click()
    cy.get('.submit-button').click()
  })

  it('displays the title', () => {
    cy.get('h1').should('contain', 'Journey Like a Genius')
  })

  it('displays the personalized itinerary message', () => {
    cy.get('h4.itinerary-generated-message').should('contain', 'Thank you for your information. A personalized itinerary has been generated to meet your needs.')
  })

  it('displays itinerary details', () => {
    cy.get('.itinerary-details p').should('exist')
  })

  it('has functional buttons', () => {
    cy.get('button.try-again-button').should('exist')
    cy.get('button.save-button').should('exist')
    cy.get('button.return-home').should('exist')
  })
})