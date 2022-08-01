/// <reference types="cypress" />

const URL = "http://localhost:3000";
const URL_API = "http://localhost:5000";
const amount = 3;

before(() => {
    cy.resetDatabase();
    cy.visit("/");
    cy.createRecommendations();
    for(let i = 0; i < amount ; i++){
        cy.addUpvote();

    }
    cy.createRecommendations();
});

describe("top page", () => {
    it("should navigate to /top", () => {
        cy.contains("Top").click();
        cy.url().should("equal", `${URL}/top`);
    });

    it("should return top 10 highest score recommendations", () => {
        cy.get("article:first").within(() => {
            cy.get("div:last").invoke("text").then(text => {
                cy.wrap(text).should("equal", `${amount}`);
            });
        });
    });
});