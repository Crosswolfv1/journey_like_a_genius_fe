describe('Itinerary Component', () => {
  beforeEach(() => {
    cy.fixture('preferences').then((preferences) => {
      cy.log('Preferences:', JSON.stringify(preferences)); 
      cy.visit('http://localhost:3000/itinerary/1', {
        state: preferences,
      })
    })
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