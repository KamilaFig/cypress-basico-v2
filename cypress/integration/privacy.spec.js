// Extra exercise: Running the same test case 'n' times using lodash (Cypress._).
Cypress._.times(5, function() {
  it('Independently tests the privacy policy page', function(){
    //Lesson 07: Extra exercise 2: Independently page tests
    cy.visit('./src/privacy.html')
  
    cy.contains('Talking About Testing').should('be.visible')
  })
})
