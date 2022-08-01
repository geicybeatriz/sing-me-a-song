const URL_API = "http://localhost:5000";

Cypress.Commands.add("resetDatabase", () => {
    cy.log("reset database")
    cy.request("DELETE", `${URL_API}/e2e/reset`).then( res => {
        cy.log(res)
    })
})