let testfunc = () => {
  it('is true', () => {
    expect(true).to.equal(true)
  })
}

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
    cy.url().should('include', '/commands/actions')
    cy.get('.action-email').type('fake@fakemail.com')
    cy.get('.action-email').should('have.value', 'fake@fakemail.com')
    cy.contains('commands')
  })
})

describe('true test', testfunc)