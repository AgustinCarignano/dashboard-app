describe("Execute action to delete a booking", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Sign In").click();
  });

  it("There is a delete button in the bookings list", () => {
    cy.get('[data-cy="goBookings"]').click();
    cy.get('[data-cy="booking_action_options_382715624-6"]').click();
    cy.get('[data-cy="delete_one_382715624-6"]').should("exist");
  });

  it("The booking is remove from the UI when dispatch the delete action", () => {
    cy.get('[data-cy="goBookings"]').click();
    cy.contains("Carroll Southern").should("exist");
    cy.get('[data-cy="booking_action_options_382715624-6"]').click();
    cy.get('[data-cy="delete_one_382715624-6"]').click();
    cy.contains("CONFIRM").click();
    cy.get('[data-cy="searchBar"]').type("Carroll Southern");
    cy.contains("Carroll Southern").should("not.exist");
  });
});
