describe('Homepage User Flows', () => {
  beforeEach(() => {
    cy.viewport(11440, 900)
    cy.visit('http://localhost:3000')
  })

  it('should display the correct title and introductory text', () => {
    cy.get('h1').should('contain', 'Journey Like a Genius')
    cy.get('h2').should(
      'contain',
      "We're excited to get started on your personalized travel itinerary."
    )
    cy.get('p').should(
      'contain',
      "We'll ask a series of questions to better understand you lifestyle, preferences, and unique needs so we can generate a perfect travel day."
    )
  })

  it('should display a button that labeled login that logs a user in', () => {
    cy.get('.login-button').click()
    cy.url().should('include', '/1')
  })

  it('should display a button that navigates to Preferences', () => {
    cy.contains('button', "Let's get started").click()
    cy.contains('h2', 'Please make your selections')
  })

  it('should not show the homepage content after navigating to Preferences', () => {
    cy.get('.preferences').click()

    cy.get('h1').should('not.exist')
    cy.get('h2').should('not.contain', 'We’re excited to get started')
  })
})