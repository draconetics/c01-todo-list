describe('#tasklist',()=>{
    let BASE_URL = '';
    beforeEach(() => {
        cy.visit('/tasklist');
        cy.server();
        BASE_URL = 'http://localhost:3000'
    });
    it('should not insert empty task',()=>{
        cy.route({
            url: `${BASE_URL}/tasks`,
            method: 'POST',
            status: 200,
            response: {
                _id:'1234567989a',
                task:'this is the task number 1th'
            }
          })
        
        cy.wait(1000)

        cy.get('button')
            .first()
            .as('insertTaskButton')
        
        
        cy.get('.tasklist__content').then(($tasklist__content)=>{
            const oldLength = $tasklist__content.children().length
            cy.log(oldLength)
            cy.get('.tasklist__form input').should('have.value','')
            cy.get('@insertTaskButton').click()
            cy.get('.tasklist__item').should('have.length',oldLength)
        })
        
    })

    it('should insert new task',()=>{
        cy.route({
            url: `${BASE_URL}/tasks`,
            method: 'POST',
            status: 200,
            response: {
                _id:'1234567989a',
                task:'this is the task number 1th'
            }
          })
        
        cy.get('.tasklist__form input')
            .type('study programming')
        cy.get('button')
            .first()
            .as('newTodoButton')
      
        cy.get('@newTodoButton')
            .should('have.text','Add new task')

        cy.get('.tasklist__content').then(($a) => { 
            if ($a.text().includes('Edit')) {
                cy.log('exist')
                let oldLength = $a.children().length;
                cy.get('@newTodoButton').click();
                cy.log(oldLength)
                cy.get('.tasklist__content').find('ul').should('have.length',oldLength+1)
            }else{
                cy.log('no exist')
                cy.get('@newTodoButton').click();
                cy.get('.tasklist__content').find('ul').should('have.length',1)
            }
        })
    })

    it.only('should delete a task item',()=>{

        cy.wait(1000)
        cy.get('.tasklist__content').then(($tasklist__content)=>{
            if($tasklist__content.text().includes('Delete')){
                const oldLength = $tasklist__content.children().length;
                cy.get('button').contains('Delete').first().click();
                cy.get('.tasklist__content').find('ul').should('have.length',oldLength-1)
            }else{
                cy.get('button').contains('Delete').first().click();
                cy.get('.tasklist__content').find('ul').should('have.length',1)
            }
        })
    })

    it('should edit a task item',()=>{
        //verify list is empty
        cy.wait(1000)

        cy.get('.tasklist__content').then(($tasklist__content)=>{
            if($tasklist__content.text().includes('Edit')){
                cy.get('.tasklist__item').first().find('button').contains('Edit').click()
                
                cy.get('.modal__form input').then(($input)=>{
                    const inputValue = $input.val()
                    cy.wrap($input).type('123')
                    cy.get('.modal__form').find('button').contains('save').click()
                    cy.wait(2000)
                    cy.get('.tasklist__item').first().find('li').eq(1).should('have.text',(inputValue+'123'))
                });
                
            }else{
                cy.log('empty list')
            }
        })

    })

    it('After edit, should not save empty todo field',()=>{
        //verify list is empty
        cy.wait(1000)

        cy.get('.tasklist__content').then(($tasklist__content)=>{
            if($tasklist__content.text().includes('Edit')){
                const oldInputValue = $tasklist__content.children().find('li').eq(1).text()
                cy.get('.tasklist__item').first().find('button').contains('Edit').click()
                
                cy.get('.modal__form input').clear();
                cy.get('.modal__form').find('button').contains('save').click()
                cy.wait(1000)
                cy.get('.tasklist__item').first()
                        .children('li')
                        .eq(1)
                        .should('have.text',(oldInputValue))
            }else{
                cy.log('empty list')
            }
        })
    })
});