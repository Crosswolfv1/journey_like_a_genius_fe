describe("Preferences Form", () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.intercept("GET", 'http://localhost:3001/api/v1/itinerary')
    cy.visit("http://localhost:3000/preferences/1")
  })

  it("renders all form fields and the submit button", () => {
    cy.get("h2").contains("Please make your selections")
    cy.get("#city").should("exist")
    cy.get("#half-day").should("exist")
    cy.get("#culture").should("exist")
    cy.get("#museum").should("exist")
    cy.get("#expensive").should("exist")
    cy.get("#single").should("exist")
    cy.get("#american").should("exist")
    cy.get("#french").should("exist")
    cy.get(".submit-button").should("exist")
  })

  it("shows validation errors when required fields are missing", () => {
    cy.get(".submit-button").click()
    cy.get(".error-messages").should("exist")
    cy.get(".error-messages ul li").should("contain", "Please enter a city")
  })

})