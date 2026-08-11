describe('Funcionalidade: Login', () => {
    it('deve realizar login com credenciais válidas', () => {
        cy.visit('/signin');

        cy.contains('Login').click();

        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');

        cy.contains('button', 'Sign in').click();

        cy.contains('Logout').should('be.visible');
    });

    it('deve falhar ao realizar login com email inválido e senha válida', () => {
        cy.visit('/signin');

        cy.contains('Login').click();

        cy.get('[data-cy="email"]').type('cruzeiro@test.com');
        cy.get('[data-cy="password"]').type('test123');

        cy.contains('button', 'Sign in').click();

        cy.contains('Invalid email or password').should('be.visible');
    });

    it('deve falhar ao realizar login com email válido e senha inválida', () => {
        cy.visit('/signin');

        cy.contains('Login').click();

        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test987');

        cy.contains('button', 'Sign in').click();

        cy.contains('Invalid email or password').should('be.visible');
    });

    it('deve falhar ao realizar login com email e senha inválidos', () => {
        cy.visit('/signin');

        cy.contains('Login').click();

        cy.get('[data-cy="email"]').type('liberta@test.com');
        cy.get('[data-cy="password"]').type('test582');

        cy.contains('button', 'Sign in').click();

        cy.contains('Invalid email or password').should('be.visible');
        
    });


    it('ao deixar o campo Password em branco, deve exibir mensagem de erro', () => {
        cy.visit('/signin');
        
        cy.contains('Login').click();

        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').clear();
        cy.contains('button', 'Sign in').click();
        cy.contains('Password is required').should('be.visible');
    });


    it('ao deixar o campo Email em branco, deve exibir mensagem de erro', () => {
        cy.visit('/signin');

        cy.contains('Login').click();
        cy.get('[data-cy="email"]').clear();
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('button', 'Sign in').click();
        cy.contains('Email is required').should('be.visible');

    })  

    it('ao deixar os campos Email e Password em branco, deve exibir mensagens de erro', () => {
        cy.visit('/signin');

        cy.contains('Login').click();
        cy.get('[data-cy="email"]').clear();
        cy.get('[data-cy="password"]').clear();
        cy.contains('button', 'Sign in').click();
        cy.contains('Email is required').should('be.visible');
        cy.contains('Password is required').should('be.visible');


    });
    
})   
