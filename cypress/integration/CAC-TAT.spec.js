/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
  const THREE_SECONDS_IN_MS = 3000

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verify the application title', function(){
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  
  it('fill the required fields and submit the form', function(){
    // Extra exercise 1: Creating a varible to type a long text on the open-text-area field.
    const longText = 'I am learning to automate with Cypress. I am learning to automate with Cypress. I am learning to automate with Cypress. I am learning to automate with Cypress.'
    
    cy.clock()

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
      .type(longText, { delay:0 })
      .should('have.value', longText)

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
   })

  it('show error message when submitting the form with an invalid email format', function(){
    // Extra exercise 2: Error class
    cy.clock()

    cy.get('#firstName')
      .type('Kamila')
      .should('have.value', 'Kamila')

    cy.get('#lastName')
      .type('Fig')
      .should('have.value', 'Fig')

    cy.get('#email')
      .type('testealimbrgmail.com')
      .should('have.value', 'testealimbrgmail.com')

    cy.get('#open-text-area')
      .type('Extra exercise 2')
      .should('have.value', 'Extra exercise 2')

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('phone field is empty when they has no numeric value', function(){
    //Extra exercice 3: Numeric value for phone field only.
    cy.get('#phone')
      .type('testing')
      .should('have.value', '')
    
  })

  it('show error message when phone field becomes mandatory but not filled when submitting form', function(){
    // Extra exercise 4: Error when phone required field is not filled.

    cy.clock()

    cy.get('#firstName')
      .type('Kamila')
      .should('have.value', 'Kamila')

    cy.get('#lastName')
      .type('Fig')
      .should('have.value', 'Fig')

    cy.get('#email')
      .type('testealimbr@gmail.com')
      .should('have.value', 'testealimbr@gmail.com')
    
    cy.get('#phone-checkbox')
      .check()

    cy.get('#open-text-area')
      .type('Extra exercise 4')
      .should('have.value', 'Extra exercise 4')

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('fills and clears the nome, sobrenome, email and telefone fields', function(){
    // Extra exercise 5: fills and clears fields.
    cy.get('#firstName')
      .type('Kamila')
      .should('have.value', 'Kamila')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Fig')
      .should('have.value', 'Fig')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('testealimbr@gmail.com')
      .should('have.value', 'testealimbr@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('85911111111')
      .should('have.value', '85911111111')
      .clear()
      .should('have.value', '')
  })

  it('show error message when submitting form with empty required fields.', function(){
    // Extra exercise 6: Error when all required fields are not filled.

    cy.clock()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('submit the form successfully using custom commands.', function(){
    // Extra exercise 7: Custom commands.

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()
    
    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
  })

  it('select a product (Youtube) by text', function(){
    //Select a product by text
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('select a product (Mentoria) by value', function(){
    //Extra exercise 1: Select a product by value
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('select a product (Blog) by index', function(){
    //Extra exercise 1: Select a product by index
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })
  it('marks the type of service "Feedback"', function(){
    //Marks the type of service
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marks each type of service', function(){
    //Extra exercise:marks each type of service
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('check both checkboxes and uncheck the last one', function(){
    //Checkbox: check and uncheck
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('select a file from the fixtures folder', function(){
    //Upload File
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('select a file simulating a dra-and-drop', function(){
    //Extra exercise 1: Drag-and-drop file
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('select a file using a fixture given an alias', function(){
    //Extra exercise 2: Given an alias
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })      
  })

  it('Verify that the privacy policy opens in another tab without the need for a click', function(){
    //Lesson 07: Links that open in another tab
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('Access the privacy policy page by removing the target and clicking the link', function(){
    //Lesson 07: Extra exercise 1: Removing target
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })

  it('show and hide success and error messages using .invoke', function(){
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('Fill the text area using the invoke command', function(){
    //Creating a long text and put it on the variable, the test will do a "CTRL+V" of the text.
    const longText = Cypress._.repeat('I am testing, ', 20)

    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })
})
