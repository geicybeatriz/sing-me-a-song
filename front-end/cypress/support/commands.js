/// <reference types="cypress" />

import {faker} from "@faker-js/faker";

const URL_API = "http://localhost:5000";

Cypress.Commands.add("resetDatabase", () => {
    cy.request("DELETE", `${URL_API}/e2e/reset`).then( res => {
        cy.log(res)
    })
});

Cypress.Commands.add("createRecommendations", () => {
    const recommendation = {
        name: faker.lorem.words(3),
        youtubeLink: "https://youtu.be/perTTMRpc_U"
    }

    cy.get("input[placeholder='Name']").type(recommendation.name);
    cy.get("input[placeholder='https://youtu.be/...']").type(recommendation.youtubeLink);
    cy.intercept("POST", `${URL_API}/recommendations`).as("postRecommendation");
    cy.get("button").click();
    cy.wait("@postRecommendation");

    return cy.wrap(recommendation.name);
});

Cypress.Commands.add("addUpvote", () => {
    cy.get("article:first").within(() => {
        cy.get("svg:first").click().wait(5000);
    })
});

Cypress.Commands.add("addDownvote", () => {
    cy.get("article:last").within(() => {
        cy.get("svg:last").click().wait(5000);
    })
});
