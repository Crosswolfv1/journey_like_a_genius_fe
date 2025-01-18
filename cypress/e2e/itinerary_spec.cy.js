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
    cy.intercept('https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true', {
      statusCode: 200,
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

    it('displays item details on page load', () => {
      cy.intercept('POST', 'https://places.googleapis.com/$rpc/google.maps.places.v1.Places/SearchText', {
        statusCode: 200,
        body: {
          results: [
            {
              displayName: "Devil Moon Barbecue",
              formattedAddress: "1188 Girod St, New Orleans, LA 70113, USA",
              id: "ChIJxXaoTxGlIIYRl-VnF26Vpbg",
              internationalPhoneNumber: "+1 504-788-0093",
              isGoodForChildren: true,
              isGoodForGroups: true,
              priceLevel: "MODERATE",
              regularOpeningHours: [
                "Monday: Closed",
                "Tuesday: 11:00 AM – 3:00 PM",
                "Wednesday: 11:00 AM – 3:00 PM",
                "Thursday: 11:00 AM – 3:00 PM",
                "Friday: 11:00 AM – 3:00 PM",
                "Saturday: 11:00 AM – 3:00 PM",
                "Sunday: 11:00 AM – 3:00 PM"
              ]
            }
          ]
        }
      }).as('getFoodPlaces');
    

      cy.visit('http://localhost:3000/itinerary/1');
      cy.wait('@getFoodPlaces');

      cy.get('.restaurant1').then($restaurant => {
        cy.log('Restaurant HTML:', $restaurant.html());
        console.log('Restaurant Element:', $restaurant[0]); // Logs to browser console
      });

      cy.get('.restaurant1').should('exist').and('be.visible');
      cy.get('.restaurant1', { timeout: 10000 }).should('contain', "Devil Moon Barbecue");
      // // cy.get('.restaurant1').should('contain', "1188 Girod St, New Orleans, LA 70113, USA");
      // // cy.get('.restaurant1').should('contain', "+1 504-788-0093");
    });
  });  