describe("Action to create a new room", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Sign In").click();
    cy.get('[data-cy="goBookings"]').click();
  });
  it("There is a 'New Booking' option in booking page that redirect correctly", () => {
    cy.contains("+ New Booking").should("exist").click();
    cy.url().should("include", "/bookings/create");
  });
  it("And error message appears if there is an empty input. The incorrects inputs change their border to red color", () => {
    cy.contains("+ New Booking").click();
    cy.contains("CREATE").click();
    cy.get('[data-cy="bookingFormError"]').should(
      "have.text",
      "Error: check the remark inputs"
    );
    cy.contains("OK").click();
    cy.get('[data-cy="bookingFormGuest"]').should(
      "have.css",
      "border",
      "0.8px solid rgb(226, 52, 40)"
    );
    cy.get('[data-cy="bookingFormCheckIn"]').should(
      "have.css",
      "border",
      "0.8px solid rgb(226, 52, 40)"
    );
    cy.get('[data-cy="bookingFormCheckOut"]').should(
      "have.css",
      "border",
      "0.8px solid rgb(226, 52, 40)"
    );
    cy.get('[data-cy="bookingFormRoom"]').should(
      "have.css",
      "border",
      "0.8px solid rgb(226, 52, 40)"
    );
  });
  it("If all inputs are fill, a new booking is created when click in 'CREATE' button, and redirect to booking detail", () => {
    cy.contains("+ New Booking").click();
    cy.get('[data-cy="bookingFormGuest"]').type("Agustin Carignano");
    cy.get('[data-cy="bookingFormCheckIn"]').type("2023-04-25");
    cy.get('[data-cy="bookingFormCheckOut"]').type("2023-04-30");
    cy.get('[data-cy="bookingFormRoom"]').select("655 - Suite");
    cy.get('[data-cy="bookingFormRequest"]').type(
      "Filling the inputs with Cypress"
    );
    cy.contains("CREATE").click();
    cy.get('[data-cy="bookingDetail"]')
      .contains("Agustin Carignano")
      .should("exist");
    cy.get('[data-cy="bookingDetail"]').contains("ID").should("exist");
  });
  it("The new booking also appear in the list of bookings", () => {
    cy.contains("+ New Booking").click();
    cy.get('[data-cy="bookingFormGuest"]').type("Agustin Carignano");
    cy.get('[data-cy="bookingFormCheckIn"]').type("2023-04-25");
    cy.get('[data-cy="bookingFormCheckOut"]').type("2023-04-30");
    cy.get('[data-cy="bookingFormRoom"]').select("655 - Suite");
    cy.get('[data-cy="bookingFormRequest"]').type(
      "Filling the inputs with Cypress"
    );
    cy.contains("CREATE").click().wait(1000);
    cy.get('[data-cy="goBookings"]').click();
    cy.get('[data-cy="searchBar"]').type("Agustin Car");
    cy.get('[data-cy="dataTable"]')
      .contains("Agustin Carignano")
      .should("exist");
  });
});
