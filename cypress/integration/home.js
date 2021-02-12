describe('#home',()=>{
    beforeEach(() => {
        cy.visit('/');
    });
    it('should not insert empty todo',()=>{
        
        cy.get('button')
            .first()
            .as('insertTodoButton')
        
        //verify list is empty
        const nonExistent = Cypress.$('.todolist__content-row');

        if(nonExistent.length > 0){
            cy.get('.todolist__content-row')
            .then(contentRows => {
                const listingCount = Cypress.$(contentRows).length;
                cy.get('@insertTodoButton').click();
                cy.get('.todolist__content-row')
                    .its('length')
                    .then(newLength =>{
                        expect(newLength).to.equal(listingCount);
                    });
            }) 
        }else{
            cy.log('List is empty')
            cy.get('@insertTodoButton').click();
            expect(Cypress.$('.todolist__content-row').length).to.equal(0);
        }
    })

    it('should insert new todo',()=>{
        
        cy.get('.todolist__form input')
            .type('study programming')
        cy.get('button')
            .first()
            .as('newTodoButton')
      
        cy.get('@newTodoButton')
            .should('have.text','New Todo');
        
        //verify list is empty
        const nonExistent = Cypress.$('.todolist__content-row');

        if(nonExistent.length > 0){
            cy.get('.todolist__content-row')
            .then(contentRows => {
                const listingCount = Cypress.$(contentRows).length;
                cy.get('@newTodoButton').click();
                cy.get('.todolist__content-row')
                    .its('length')
                    .then(newLength =>{
                        if ($a.text().includes('')) {
                            cy.log('exist')
                            const oldLength = $a.children().length;
                            //cy.get('@newTodoButton').click();
                            cy.log(oldLength)
                            cy.get('.tasklist__item').should('have.length',oldLength)
                        }else{
                            cy.log('no exist')
                        }
                    });
            }) 
        }else{
            cy.log('List is empty')
            cy.get('@newTodoButton').click();
                cy.get('.todolist__content-row')
                    .should('have.length',1);
        }
    })

    it('should delete a todo item when there are at least 2 elements',()=>{
        //verify list is empty
        const nonExistent = Cypress.$('.todolist__content-row');

        if(nonExistent.length >= 2){
            cy.get('.todolist__content-row')
            .then(contentRows => {
                const oldLength = Cypress.$(contentRows).length;
                cy.get('button').contains('Delete').first().click();
                cy.get('.todolist__content-row')
                    .its('length')
                    .then(newLength =>{
                        expect(newLength).to.be.lessThan(oldLength)
                    });
            }) 
        }
    })

    it('should delete a todo item when there are at least 1 element',()=>{
        //verify list is empty
        const nonExistent = Cypress.$('.todolist__content-row');

        if(nonExistent.length === 1){
            cy.get('.todolist__content-row')
            .then(contentRows => {
                const oldLength = Cypress.$(contentRows).length;
                cy.get('button').contains('Delete').first().click();
                expect(Cypress.$('.todolist__content-row').length).to.equal(0);
            }) 
        }
    })

    it('should edit a todo item',()=>{
        //verify list is empty
        const nonExistent = Cypress.$('.todolist__content-row');
        if(nonExistent.length >= 1){
            cy.get('button').contains('Edit').first().click();     
            cy.get('.todolist__content-row').first().find('input')
                .then($input=>{
                    const newValue = '123';
                    const oldInputValue = $input.val();
                    cy.log($input.val());
                    cy.wrap($input).type(newValue)
                    cy.get('button').contains('Save').first().click();     
                    cy.get('.todolist__content-row').first()
                        .children('li')
                        .eq(1)
                        .should('have.text',oldInputValue+newValue)
                });     
        }
        
    })

    it.only('After edit, should not save empty todo field',()=>{
        //verify list is empty
        const nonExistent = Cypress.$('.todolist__content-row');
        if(nonExistent.length >= 1){
            cy.get('button').contains('Edit').first().click();     
            cy.get('.todolist__content-row').first().find('input').clear()
                .then($input=>{
                    cy.get('button').contains('Save').first().click();     
                    cy.get('.todolist__content-row').first()
                        .children('li')
                        .eq(1)
                        .should('not.have.text','')
                });
        }
    })
});