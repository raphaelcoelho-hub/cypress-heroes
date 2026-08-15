describe('Controle de permissão - UI', () => {
    beforeEach(() => {
        // Garante a limpeza da sessão simulando visitante em aba anônima
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    it('deve carregar a interface em modo público', () => {
        cy.visit('/heroes');

        cy.url().should('include', '/heroes');
        cy.contains('button', 'Create New Hero').should('not.exist');
        cy.contains('button', 'Logout').should('not.exist');
    });

    it('bloquear acesso à  /heroes/new sem estar logado',  () => {
        cy.visit('/heroes/new')

        cy.url().should('include', '/signin');

        cy.contains('Login').should('be.visible');
    });

    it('deve exibir elementos da página de listagem de heróis após login com credenciais válidas', () => {
        cy.visit('/heroes');

        cy.contains('button', 'Login').click();

        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('Sign in').click();
        
        // garante a mudança para a tela pós login
        cy.url().should('not.include', '/signin');
        cy.url().should('include', '/heroes');
        
        cy.contains('Create New Hero').should('be.visible');
        cy.contains('Logout').should('be.visible');

    });

    it('após logout, deve retornar para a tela pré-login sem privilégios de usuário', () => {
        cy.visit('/heroes');

        cy.contains('button', 'Login').click();
        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');

        cy.contains('button', 'Sign in').click();

        cy.contains('Logout').click();

        // Valida a retorno para a página pré-login
        cy.contains('Create New Hero').should('not.exist');
        cy.contains('Logout').should('not.exist');

        cy.get('[data-cy="like"]').eq(0).click();
        cy.contains('You must log in to like.').should('be.visible');

    });

    
    it('a aplicação não deve reativar login após Logout se o usuário clicar em voltar no navegador', () => {
    
    cy.visit('/heroes');
        
    cy.contains('button', 'Login').click();
    cy.get('[data-cy="email"]').type('admin@test.com');
    cy.get('[data-cy="password"]').type('test123');
    cy.contains('button', 'Sign in').click();
    cy.contains(/logout/i, { timeout: 10000 }).should('be.visible');

    cy.contains(/logout/i).click();
    cy.contains(/login/i).should('be.visible');

    // 3. Alterando o timeout de carregamento apenas para a ação de voltar
    Cypress.config('pageLoadTimeout', 5000);

    // Usando tratamento de exceção para não quebrar o teste caso o evento load do navegador não dispare
    cy.window().then((win) => {
      win.history.back();
    });

    // 4. Validação da página
    cy.contains('Create New Hero').should('not.exist');
    cy.contains('Logout').should('not.exist');
  });

        

    it('barrar navegação restrita após remoção do token em runtime', () => {
       cy.visit('/heroes');
       cy.contains('button', 'Login').click();
       cy.get('input[name="email"]').type('admin@test.com');
       cy.get('input[name="password"]').type('test123');
       cy.contains('Sign in').click();

       cy.contains('Create New Hero').should('be.visible');
       
       //remoção manual da chave auth_result no LocalStorage
       cy.clearLocalStorage('auth_result');

       cy.contains('Create New Hero').click();

       cy.contains(/login/i).should('be.visible');
       cy.contains('Create New Hero').should('not.exist');

    })


    it('deve tratar o acesso de um herói inexistente sem quebrar a interface', () => {

        //tentando acessar com url de um herói inexistente
        cy.visit('/heroes/999999', { failOnStatusCode: false });

        //valida se o herói existe naquela url, ou se dará mensagem de erro
        cy.contains(/Page not found/i, { timeout: 5000 }).should('be.visible');
    });

});
      



