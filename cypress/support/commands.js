//Creating a custom commands.

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
  cy.get('#firstName')
    .type('Kamila')
    .should('have.value', 'Kamila')

  cy.get('#lastName')
    .type('Fig')
    .should('have.value', 'Fig')

  cy.get('#email')
    .type('testealimbr@gmail.com')
    .should('have.value', 'testealimbr@gmail.com')

  cy.get('#open-text-area')
    .type('Extra exercise 7')
    .should('have.value', 'Extra exercise 7')

  cy.contains('button', 'Enviar').click()
})
