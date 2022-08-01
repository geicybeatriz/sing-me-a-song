/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";
const URL_API = "http://localhost:5000"

before(() => {
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
        cy.createRecommendations().then(name => {
            cy.contains(name);
        });
    });

    it("should insert upvote", () => {
        cy.addUpvote().then(() => {
            cy.get("article:last").within(() => {
                cy.get("div:last").invoke("text").then((text) => {
                    cy.wrap(text).should("equal", "1");
                });
            });
        });
    });

    it("should insert downvote", () => {
        for(let i = 0; i < 2; i++){
            cy.addDownvote().then(() => {
                cy.get("article:last").within(() => {
                    cy.get("div:last").invoke("text").then((text) => {
                        cy.wrap(text).should("equal", `${(-1)*i}`);
                    });
                });
            });
        }        
    });

    it("should delete recommendation when score is less than -5", () =>{
        for(let i = 0; i < 5; i++){
            cy.addDownvote();
        }
        cy.get("div:last").invoke("text").then(text => {
            cy.wrap(text).should("equal", "No recommendations yet! Create your own :)");

        })
    })
})