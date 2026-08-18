describe('Criar novo herói', () => {
    it('Deve criar novo herói com sucesso', () => {

        // 1.Pré condição: O usuário precisa estar logado para criar um novo herói
        cy.visit('/signin');
        cy.contains('Login').click();
        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('Sign in').click();

        // 2. Na tela inicial, onde estão os heróis listados, o usuário clica em "Create New Heroe
        cy.get('[href="/heroes/new"]').click();

        //3. O usuário preenche os dados do Herói a ser criado
        cy.get('[data-cy="nameInput"]').type('Aerosmith');
        cy.get('[data-cy="priceInput"]').type('43');
        cy.get('[data-cy="fansInput"]').type('50');
        cy.get('[data-cy="savesInput"]').type('60');
        cy.get('select[data-cy="powersSelect"]').select('Mind Control');

        //4. O usuário faz upload do avatar do seu herói e clica em submit para criar o herói
        cy.get('[data-cy="avatarFile"]').selectFile('cypress/fixtures/Aerosmith.jpg')
        cy.intercept('POST', '**/heroes').as('createHero');
        cy.intercept('POST', '**/heroes/*/avatar').as('uploadAvatar');
        cy.get('button').eq(2).click();

        //5. Verifica se depois de criado, a aplicação volta para a tela de heróis e se o novo herói está listado
        cy.url().should('include', '/heroes');
        cy.contains('Aerosmith').should('be.visible');
    });

    it('editar herói criado' , () => {    
        // 1.Pré condição: O usuário precisa estar logado para editar o herói
        cy.visit('/signin');
        cy.contains('Login').click();
        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('Sign in').click();

        // 2. Herói que será editado
        const heroiOriginal = 'Daron';
        const heroiEditado = 'Slash';

        //Criando herói para garantir que ele esteja no banco de dados
        cy.get('[href="/heroes/new"]').click();
        cy.get('[data-cy="nameInput"]').type(heroiOriginal);
        cy.get('[data-cy="priceInput"]').type('10');
        cy.get('[data-cy="fansInput"]').type('20');
        cy.get('[data-cy="savesInput"]').type('30');
        cy.get('select[data-cy="powersSelect"]').select('Fireball');
        cy.get('[data-cy="avatarFile"]').selectFile('cypress/fixtures/Aerosmith.jpg');
        cy.contains('button', 'Submit').click();


        // 3. Clicar no ícone "Lápis" do herói a ser editado
        cy.contains(heroiOriginal).closest('div').find('[data-cy="pencil"]').click();

        //4. Edita as informações desejadas
        cy.get('[data-cy="nameInput"]').clear().type('Korn');
        cy.get('[data-cy="priceInput"]').clear().type('13');
        cy.get('[data-cy="fansInput"]').clear().type('60');
        cy.get('[data-cy="savesInput"]').clear().type('90');
        cy.get('select[data-cy="powersSelect"]').select('Flying');
        cy.get('[data-cy="avatarFile"]').selectFile('cypress/fixtures/Cabuloso.jpg')
        cy.contains('button', 'Submit').click();

        // 5. Valida se o herói escolhido foi editado na lista de heróis
        cy.url().should('include', '/heroes');
        cy.contains(heroiEditado).should('be.visible');
        cy.contains(heroiOriginal).should('not.exist');
    })

    it('Deve exibir mensagens de erro ao tentar criar herói sem preencher todos os campos obrigatórios', () => {
        // 1.Pré condição: O usuário precisa estar logado para criar um novo herói
        cy.visit('/signin');
        cy.contains('Login').click();
        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('Sign in').click();

        // 2. Na tela inicial, onde estão os heróis listados, o usuário clica em "Create New Hero"
        cy.get('[href="/heroes/new"]').click();

        // 3. O usuário clica em "Create" sem preencher os campos
        cy.get('button').eq(2).click();

        // 4. Verifica se as mensagens de erro são exibidas para os campos obrigatórios
        cy.contains('Name is required').should('be.visible');
        cy.contains('Price is required').should('be.visible');
        cy.contains('Fans is required').should('be.visible');
        cy.contains('Saves is required').should('be.visible');
        cy.contains('Powers is required').should('be.visible');
    })


    it('Deve exibir mensagem de erro e barrar a criação de herói com valores negativos nos campos numéricos', () => {
        // 1.Pré condição: O usuário precisa estar logado para criar um novo herói
        cy.visit('/signin');
        cy.contains('Login').click();
        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('Sign in').click();

        // 2. Na tela inicial, onde estão os heróis listados, o usuário clica em "Create New Hero"
        cy.get('[href="/heroes/new"]').click();

        // 3. O usuário preenche os campos com valores negativos
        cy.get('[data-cy="nameInput"]').type('Cabuloso');
        cy.get('[data-cy="priceInput"]').type('-43');
        cy.get('[data-cy="fansInput"]').type('-50');
        cy.get('[data-cy="savesInput"]').type('-60');
        cy.get('select[data-cy="powersSelect"]').select('Mind Control');

        //4. O usuário faz upload do avatar do seu herói e clica em submit para criar o herói
        cy.get('[data-cy="avatarFile"]').selectFile('cypress/fixtures/Aerosmith.jpg')
        cy.get('button').eq(2).click();

        //5. Garante que o usuário não é direcionado para a tela de heróis
        cy.url().should('include', '/heroes/new');
        
        // 6. Verifica se a mensagem de erro é exibida para os campos numéricos com valores negativos
        cy.contains('Price must be a positive number').should('be.visible');
        cy.contains('Fans must be a positive number').should('be.visible');
        cy.contains('Saves must be a positive number').should('be.visible');

    });


    it('Não deve permitir Upload de arquivo com extensão não suportada', () => {

        // 1.Pré condição: O usuário precisa estar logado para criar um novo herói
        cy.visit('/signin');
        cy.contains('Login').click();
        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('Sign in').click();

        // 2. Na tela inicial, onde estão os heróis listados, o usuário clica em "Create New Hero"
        cy.get('[href="/heroes/new"]').click();

        // 3. O usuário preenche os campos obrigatórios
        cy.get('[data-cy="nameInput"]').type('Extensão invalida');
        cy.get('[data-cy="priceInput"]').type('5');
        cy.get('[data-cy="fansInput"]').type('6');
        cy.get('[data-cy="savesInput"]').type('7');
        cy.get('select[data-cy="powersSelect"]').select('Flying');

        // 4. O usuário faz upload do avatar do seu herói e clica em submit para criar o herói
        cy.get('[data-cy="avatarFile"]').selectFile('cypress/fixtures/114.pdf')
        cy.get('button').eq(2).click();

        //5. Garante que o usuário não é direcionado para a tela de heróis
        cy.url().should('include', '/heroes/new');

        // 6. O sistema deve barrar a criação do herói e a mensagem de erro é exibida para o upload de arquivo com extensão não suportada
        cy.contains('File type not supported').should('be.visible');

    });

    it('Deve cancelar a criação do herói e voltar para a tela de heróis sem criar o herói', () => {

        // 1. Pré condição: O usuário precisa estar logado para criar um novo herói
        cy.visit('/signin');
        cy.contains('Login').click();
        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('Sign in').click();

        // 2. Na tela inicial, onde estão os heróis listados, o usuário clica em "Create New Hero"
        cy.get('[href="/heroes/new"]').click();

        // 3. O usuário preenche alguns dos campos do formulário
        cy.get('[data-cy="nameInput"]').type('Herói Cancelado');
        cy.get('[data-cy="priceInput"]').type('100');

        // 4. O usuário clica no botão "Cancel" sem enviar o formulário
        cy.get('[data-cy="cancelButton"]').click();

        // 5. Verifica se a aplicação volta para a tela de heróis
        cy.url().should('include', '/heroes');

        // 6. Verifica que o herói "Herói Cancelado" não foi criado (não está listado)
        cy.contains('Herói Cancelado').should('not.exist');
    });


    it('Exclusão de herói criado', () => {
        //Vai na camada de exclusão no backend
        cy.intercept('DELETE', '**/heroes/*').as('deleteHero');

        // 1. Pré condição: O usuário precisa estar logado para criar um novo herói
        cy.visit('/signin');
        cy.contains('Login').click();
        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('Sign in').click();

        // 2. Herói criado para o teste de exclusão
        const nomeHeroi = 'Excluido';

        cy.get('[href="/heroes/new"]').click();
        cy.get('[data-cy="nameInput"]').type('Excluido');
        cy.get('[data-cy="priceInput"]').type('22');
        cy.get('[data-cy="fansInput"]').type('55');
        cy.get('[data-cy="savesInput"]').type('66');
        cy.get('select[data-cy="powersSelect"]').select('Fireball');      
        cy.get('[data-cy="avatarFile"]').selectFile('cypress/fixtures/Metallica.png');
        cy.get('button').eq(2).click();

        // 3. Localiza herói criado para excluir na tela de heróis
        cy.contains(nomeHeroi).should('be.visible');

        // 4. clica no ícone "lixeira' para exclusão do herói desejado
        cy.contains(nomeHeroi).closest('.card, div').find('[data-cy="trash"]').click();

        // 5. Abre Pop up para confirmar exclusão do herói
        cy.contains('Delete Hero?').should('be.visible');
        cy.contains('Are you sure you want to delete this hero?').should('be.visible');
        cy.contains('Teste Exclusão').should('be.visible');
        cy.contains('button', 'Yes').click();

        //Procxessamento da exclusão no backend
        cy.wait('@deleteHero');

        // 6. Validção de que o herói escolhido foi realmente excluído
        cy.contains(nomeHeroi).should('not.exist');
    })


    it('Aplicação deve barrar criação de herói com mesmo nome de um já existente', () => {

        // 1. Pré condição: O usuário precisa estar logado
        cy.visit('/signin');
        cy.contains('Login').click();
        cy.get('[data-cy="email"]').type('admin@test.com');
        cy.get('[data-cy="password"]').type('test123');
        cy.contains('Sign in').click();

        // 2. Navega para criar um novo herói
        cy.get('[href="/heroes/new"]').click();

        // 3. Preenche os dados do herói com um nome que já existe (ex: Aerosmith)
        cy.get('[data-cy="nameInput"]').type('Aerosmith');
        cy.get('[data-cy="priceInput"]').type('50');
        cy.get('[data-cy="fansInput"]').type('100');
        cy.get('[data-cy="savesInput"]').type('150');
        cy.get('select[data-cy="powersSelect"]').select('Fireball');
        cy.get('[data-cy="avatarFile"]').selectFile('cypress/fixtures/Aerosmith.jpg');

        // 4. Clica em submit
        cy.contains('button', 'Submit').click();

        // 5. Verifica se a aplicação exibe mensagem de erro informando que o herói já existe
        cy.url().should('include', '/heroes/new');
        cy.contains('Hero already exists').should('be.visible');
        
    });

});




