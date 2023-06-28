describe("Private routes with login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Successfuly loaded and redirected to login", () => {
    cy.url().should("include", "/login");
  });

  it("Redirected to login if a private url is enter", () => {
    cy.visit("/bookings");
    cy.url().should("include", "/login");
  });

  it("Still shown login if enter a wrong credentials", () => {
    cy.get('[data-cy="userName"]').clear().type("WrongName");
    cy.contains("Sign In").click();
    cy.url().should("include", "/login");
    cy.contains("Try again").click();
    cy.get('[data-cy="userName"]').clear().type("agustinC");
    cy.get('[data-cy="password"]').clear().type("WrongPassword");
    cy.contains("Sign In").click();
    cy.url().should("include", "/login");
  });

  it("Show different error messages when entered wrong credentials, and a different input style", () => {
    cy.get('[data-cy="userName"]').clear();
    cy.contains("Sign In").click();
    cy.get('[data-cy="loginErrorMessage"]').should(
      "have.text",
      "You must type a user name"
    );
    cy.contains("Try again").click();
    cy.get('[data-cy="userName"]').should(
      "have.css",
      "border",
      "1px solid rgb(226, 52, 40)"
    );

    cy.get('[data-cy="userName"]').type("agustinC");
    cy.get('[data-cy="password"]').clear();
    cy.contains("Sign In").click();
    cy.get('[data-cy="loginErrorMessage"]').should(
      "have.text",
      "You must type a password"
    );
    cy.contains("Try again").click();
    cy.get('[data-cy="password"]').should(
      "have.css",
      "border",
      "0.8px solid rgb(226, 52, 40)"
    );

    cy.get('[data-cy="password"]').type("wrongPass");
    cy.contains("Sign In").click();
    cy.get('[data-cy="loginErrorMessage"]').should(
      "have.text",
      "Invalid User Name or Password"
    );
    cy.contains("Try again").click();
    cy.get('[data-cy="userName"]').should(
      "have.css",
      "border",
      "0.8px solid rgb(226, 52, 40)"
    );
    cy.get('[data-cy="password"]').should(
      "have.css",
      "border",
      "0.8px solid rgb(226, 52, 40)"
    );
  });

  it("Redirected to dashboard if enter the correct credentials", () => {
    cy.contains("Sign In").click();
    cy.url().should("include", "/dashboard");
  });
});
