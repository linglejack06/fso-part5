describe('Note app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
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
    cy.contains('Logged In:');
  });
});
