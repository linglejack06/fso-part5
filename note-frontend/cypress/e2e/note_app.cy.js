describe('template spec', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3001');
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinski 2023')
  });
});