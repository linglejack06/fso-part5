describe('Note app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Jack Lingle',
      username: 'jling',
      password: 'password',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
    cy.visit('');
  });
  it('front page can be opened', () => {
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinski 2023');
  });
  it('login form can be opened', () => {
    cy.contains('Login').click();
  });
  it('logs in user', () => {
    cy.contains('Login').click();
    cy.get('#username').type('jling');
    cy.get('#password').type('password');
    cy.contains('Login to Notes').click();
    cy.contains('Logged In: Jack Lingle');
  });
  it('fails log in with bad credentials', () => {
    cy.contains('Login').click();
    cy.get('#username').type('jling');
    cy.get('#password').type('bad-password');
    cy.contains('Login to Notes').click();
    cy.get('.error').contains('Invalid username or password');
    cy.contains('Logged In: Jack Lingle').should('not.exist');
  });
  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'jling', password: 'password' });
    });
    it('creates new note', () => {
      cy.contains('New Note').click();
      cy.get('input').type('cypress test note');
      cy.contains('save').click();
      cy.contains('cypress test note');
    });
    describe('note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'test note',
          important: true,
        });
        cy.createNote({
          content: 'second test note',
          important: false,
        });
        cy.createNote({
          content: 'third test note',
          important: true,
        });
      });
      it('changes note\'s importance', () => {
        cy.contains('test note')
          .contains('make not important')
          .click();
        cy.contains('test note')
          .contains('make important');
      });
    });
  });
});
