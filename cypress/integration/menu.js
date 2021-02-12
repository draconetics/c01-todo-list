context('navigation',()=>{
    it('should navigate to /tasklist',()=>{
        cy.visit('/')

        cy.get('.main-menu').find('a').eq(1).click()
        cy.get('.tasklist__form button').first().should('have.text','Add new task')
        cy.location('pathname').should('match', /\/tasklist$/);

    })

    it('should navigate to /',()=>{
        cy.visit('/tasklist')

        cy.get('.main-menu').find('a').eq(0).click()
        cy.get('.todolist__form button').first().should('have.text','New Todo')
        cy.location('pathname').should('match', /\//);
    })
})