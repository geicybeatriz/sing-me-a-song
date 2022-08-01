const URL_API = "http://localhost:5000";

Cypress.Commands.add("resetDatabase", () => {
    cy.request("DELETE", `${URL_API}/e2e/reset`).then( res => {
        cy.log(res)
    })
});

Cypress.Commands.add("createRecommendations", (recommendation) => {
    cy.get("input[placeholder='Name']").type(recommendation.name);
    cy.get("input[placeholder='https://youtu.be/...']").type(recommendation.youtubeLink);
    cy.intercept("POST", `${URL_API}/recommendations`).as("postRecommendation");
    cy.get("button").click();
    cy.wait("@postRecommendation");
});