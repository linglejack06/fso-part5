describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'jling',
      password: 'password',
      name: 'Jack Lingle'
    });
    cy.visit('');
  })
  it('Opens with login form', () => {
    cy.contains('Login');
  })
  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('login').click();
      cy.get('#username').type('jling');
      cy.get('#password').type('password');
      cy.contains('Login').click();
      cy.contains('Successfully logged in as Jack Lingle');
    })
    it('fails with incorrect credentials', () => {
      cy.contains('login').click();
      cy.get('#username').type('jcas');
      cy.get('#password').type('passtype');
      cy.contains('Login').click();
      cy.contains('Invalid Username or password');
    })
  });
  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({
        username: 'jling',
        password: 'password',
      })
      cy.visit('')
    })
    it('creates new blog', () => {
      cy.contains('New Blog').click();
      cy.get('#title').type('test title');
      cy.get('#author').type('Jack lingle');
      cy.get('#url').type('https://www.cnn.com');
      cy.get('.submit-btn').click();
      cy.contains('test title by Jack lingle');
    })
  })
})