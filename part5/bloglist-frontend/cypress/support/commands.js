// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('createUser', (name, username = name, password = name) => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  const user = {
    name,
    username,
    password,
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
  Cypress.Cookies.preserveOnce('session_id', 'remember_token')
})
Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', () => {
  cy.get('#open-create-blog-form').click()
  cy.get('#title').type('cypress title')
  cy.get('#author').type('cypress author')
  cy.get('#url').type('cypress url')
  cy.get('#submit').click()
  cy.contains('A new blog: cypress title by cypress author is added')
})
