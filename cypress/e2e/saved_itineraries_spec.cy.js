describe('Saved Itineraries User Flows', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.contains('View Saved Itineraries').click()
    cy.intercept('GET', '**/api/v1/itineraries', {
      fixture: 'saved_itineraries.json',
    })
  })

  it('should display the correct title and "Back to Home" button', () => {
    cy.get('h1').should('contain', 'Journey Like a Genius')
    cy.get('button').should('contain', 'Back to home')
  })

  it('should direct a user to the homepage when "Back to Home" button is clicked', () => {
    cy.get('button').contains('Back to home').should('exist')
    cy.get('button').contains('Back to home').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('should display all saved itineraries', () => {
    cy.get('.saved-single-itinerary').should('have.length', 3)
    cy.get('.saved-single-itinerary')
      .first()
      .should('contain', 'Itinerary for Paris')
  })
  
  it('should render all itinerary details correctly', () => {
    cy.get('.saved-single-itinerary').eq(0).within(() => {
    cy.get('h3.saved-itinerary-title')
      .should('contain', ' Itinerary for ')
    cy.get('.saved-itinerary-items').should('contain', 'No items for this itinerary.')
    })
  
    cy.get('.saved-single-itinerary').eq(1).within(() => {
      cy.get('h3.saved-itinerary-title').should('contain', 'Itinerary for San Antonio - half-day')
      cy.get('.saved-itinerary-items').within(() => {
        cy.get('strong').eq(0).should('contain', "Pinkerton's Barbecue")
        cy.get('strong').eq(1).should('contain', 'Headwaters Sanctuary')
      })
    })
  
    cy.get('.saved-single-itinerary').eq(2).within(() => {
      cy.get('h3').should('contain', 'Itinerary for San Antonio - half-day')
      cy.get('.saved-itinerary-items').within(() => {
        cy.get('strong').eq(0).should('contain', 'El Monte BBQ')
        cy.get('strong').eq(1).should('contain', 'Natural Bridge Caverns')
      })
    })
  })
  
  it('should display a message when no itineraries are available', () => {
    cy.intercept('GET', '**/api/v1/itineraries', {
      fixture: 'no_itineraries.json',
    }).as('getNoItineraries')
    cy.visit('http://localhost:3000')
    cy.contains('View Saved Itineraries').click()
    cy.wait('@getNoItineraries')
    cy.get('.saved-single-itinerary').should('not.exist')
    cy.contains('No itineraries available.').should('exist')
  })
  
})
