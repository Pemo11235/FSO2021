describe('Blog app', function () {
  beforeEach(function () {
    cy.createUser('pemo')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#login-form')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('pemo')
      cy.get('#password').type('pemo')
      cy.get('#input-button').click()

      cy.contains('pemo logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('nope')
      cy.get('#password').type('nope')
      cy.get('#input-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .should('have.css', 'border', '2px solid rgb(255, 0, 0)')
      cy.get('#error-text').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login('pemo', 'pemo')
    })
    it('a new blog can be created', function () {
      cy.createBlog()
    })
  })
})
