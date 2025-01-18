describe('itinerary spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/itinerary", {
      statusCode: 200,
      fixture: "preferences",
      fixture: "itinerary_item_1",
      fixture: "itinerary_item_2"
    })
    cy.visit('http://localhost:3000')
  })

  it('displays title on page load', () => {
    cy.get('h1').contains('Journey Like a Genius')
  })
})