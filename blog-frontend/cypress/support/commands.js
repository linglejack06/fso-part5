Cypress.Commands.add('login', (credentials) => {
  cy.request('POST', 'http://localhost:3001/api/login', credentials)
    .then(({ body }) => {
      localStorage.setItem('loggedUser', JSON.stringify(body));
    })
})