const { wait } = require("@testing-library/user-event/dist/utils");

describe("Logout process destroy de session", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.contains("Sign In").click();
  });
  it("There is an user object session in the local storage", () => {
    cy.wait(1000).then(() => {
      expect(JSON.parse(localStorage.getItem("login"))).to.deep.equal({
        auth: true,
        fullName: "Edouard Louys",
        email: "elouys7@usda.gov",
        photo: "https://i.imgur.com/wcT5ydV.jpg",
      });
    });
  });
  it("there is a logout button which destroy the session and redirect to login", () => {
    cy.get('[data-cy="logoutBtn"]').click();
    cy.url().should("include", "/login");
    cy.wait(1000).then(() => {
      expect(JSON.parse(localStorage.getItem("login"))).to.deep.equal({
        auth: false,
        fullName: "",
        email: "",
        photo: "",
      });
    });
  });
});
