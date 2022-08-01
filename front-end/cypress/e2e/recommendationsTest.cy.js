/// <reference types="cypress" />

const URL = "http://localhost:3000";

beforeEach(() => {
    cy.resetDatabase();
})

describe("home page", () => {
    it("should navigate to / successfully", () => {
        cy.visit("/");
        cy.url().should("equal", `${URL}/`);
        cy.get("input").should("be.visible");
        
    })
})