/// <reference types="cypress" />

const URL = "http://localhost:3000";
const URL_API = "http://localhost:5000";
const amount = 3;

before(() => {
    cy.resetDatabase();
    cy.visit("/");
    for(let i = 0; i < amount ; i++){
        cy.createRecommendations();
    }
});

describe("random page", () => {
    it("should navigate to /random", () => {
        cy.contains("Random").click();
        cy.url().should("equal", `${URL}/random`);
    });

    it("should return a random recommendation", () => {
        cy.get("article:first").should("be.visible");
    });
});