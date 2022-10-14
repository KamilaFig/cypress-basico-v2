
it.only('Independently tests the privacy policy page', function(){
  //Lesson 07: Extra exercise 2: Independently page tests
  cy.visit('./src/privacy.html')

  cy.contains('Talking About Testing').should('be.visible')
})
