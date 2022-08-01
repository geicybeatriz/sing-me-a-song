/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";
const URL_API = "http://localhost:5000"

beforeEach(() => {
    cy.resetDatabase();
})

describe("home page", () => {
    it("should navigate to / successfully", () => {
        cy.visit("/");
        cy.url().should("equal", `${URL}/`);
        cy.get("input").should("be.visible");
    });
    
    it("should post new recommendation", () => {
        cy.visit("/");
        for(let i = 0; i < 3; i++){
            const recommendation = {
                name: faker.lorem.words(3),
                youtubeLink: "https://youtu.be/perTTMRpc_U"
            }
            cy.createRecommendations(recommendation);
            cy.contains(recommendation.name);
        }
    });
})