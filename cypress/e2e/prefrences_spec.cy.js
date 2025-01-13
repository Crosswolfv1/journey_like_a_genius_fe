describe("Preferences Form", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it("should render the preferences form with all sections and inputs", () => {
    cy.get(".preferences-container").should("exist")

    cy.contains("Would you prefer a half day or full day itinerary?")
    cy.contains("What type of activity are you looking to do?")
    cy.contains("What type of budget are you looking to stay within?")
    cy.contains("Would you like accessibility options?")
    cy.contains("What does your travel party look like?")
    cy.contains("What type of food do you like?")

    cy.get(".submit-button")
    .should("exist")
    .and("contain.text", "Submit Your Preferences")
  })
})