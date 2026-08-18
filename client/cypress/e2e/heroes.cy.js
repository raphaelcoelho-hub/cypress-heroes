describe('Listagem de heróis', () => {
    it('deve exibir a lista de 7 heróis após login com sucesso', () => {
        cy.visit('/signin');

        // Acessa a tela de login e realiza o login com credenciais válidas
        cy.contains('Login').click();
        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('button', 'Sign in').click();

        // Verifica se a lista de heróis é exibida corretamente
        cy.visit('/heroes');
        cy.get('[data-cy="hero-card"]').should('have.length', 20);
    
    });

});


