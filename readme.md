# Projeto de Automação de Testes - Cypress Heroes

## 📌 Sobre o Exercício
Este projeto faz parte do módulo prático de automação de testes com **Cypress**. O objetivo principal é simular um cenário real de mercado, onde atuamos como QA Engineers responsáveis por planejar, documentar e automatizar testes de ponta a ponta (E2E) em uma aplicação web.

Diferente de atividades guiadas, a proposta deste exercício é dar autonomia total ao profissional para explorar a aplicação **Cypress Heroes**, identificar cenários de teste críticos (caminho feliz e de exceção), mapear bugs, propor melhorias de usabilidade e estruturar a suíte de automação do zero.

---

## 🎯 Objetivos do Projeto
- Clonar e configurar o ambiente de desenvolvimento local (Fullstack: React + NestJS).
- Mapear e documentar os casos de teste da aplicação.
- Automatizar as suítes utilizando Cypress na pasta `client/e2e`.
- Registrar apontamentos técnicos, comportamentos inesperados (bugs) e sugestões de melhoria para o sistema.

---

# Configuração e Execução do Projeto (Cypress Heroes)

Abaixo descrevo o passo a passo que segui para clonar o repositório, instalar as dependências e colocar a aplicação rodando localmente para realizar os testes.

---

### **1. Clonar o repositório**
Primeiro, abri o terminal e fiz o clone do projeto para a minha máquina a partir do [repositório oficial do Cypress Heroes](https://github.com/cypress-io/cypress-heroes):

```bash
git clone [https://github.com/cypress-io/cypress-heroes.git](https://github.com/cypress-io/cypress-heroes.git)

cd cypress-heroes

````

### **2. Como o projeto utiliza a estrutura de mono repo (com front-end e back-end na mesma pasta), instalei todas as dependências a partir da raiz rodando:

npm install

---

### **3. Com as dependências instaladas, executei o comando de setup para preparar a base de dados inicial (Prisma ORM) e popular os dados de teste:

npm run setup

*** Obs: Nota: Caso precise resetar o banco de dados para o estado inicial em qualquer momento durante os testes, basta rodar npm run resetdb no terminal.

---

### **4. Para subir tanto o servidor (back-end em NestJS) quanto o cliente (front-end em React), rodei o comando:

npm run dev

Após o comando finalizar, os serviços ficaram disponíveis nos seguintes endereços locais:

Front-end: http://localhost:3000

API Back-end: http://localhost:3001

---

### **5. Com a aplicação no ar, abri um novo terminal, naveguei até a pasta do cliente e iniciei a interface do Cypress:

cd client
npx cypress open

A partir daí, selecionei a opção E2E Testing, escolhi o navegador de preferência e executei as suítes de testes criadas na pasta cypress/e2e

---

# Feature 1 -  Login
---
### **CT-01: Deve realizar login com credenciais válidas**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar o acesso à aplicação ao utilizar credenciais de login válidas.
* **Passo a Passo para Reprodução:**
  1. Acessar a aplicação pela URL `/signin`.
  2. Clicar no botão/link `"Login"`.
  3. No campo e-mail (`[data-cy="email"]`), digitar `admin@test.com`.
  4. No campo senha (`[data-cy="password"]`), digitar `test123`.
  5. Clicar no botão `"Sign in"`.
* **Resultado Esperado:** O login deve ser realizado com sucesso e o botão/opção `"Logout"` deve ser exibido na tela.
* **Resultado Obtido:** Sucesso. O usuário é autenticado e direcionado para a área logada.

---

### **CT-02: Deve falhar ao realizar login com e-mail inválido e senha válida**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar o bloqueio de acesso ao informar um e-mail não cadastrado com uma senha válida.
* **Passo a Passo para Reprodução:**
  1. Acessar a URL `/signin`.
  2. Clicar no botão/link `"Login"`.
  3. No campo e-mail (`[data-cy="email"]`), digitar `cruzeiro@test.com`.
  4. No campo senha (`[data-cy="password"]`), digitar `test123`.
  5. Clicar no botão `"Sign in"`.
* **Resultado Esperado:** A tentativa de login deve ser recusada e a mensagem `"Invalid email or password"` deve ser exibida.
* **Resultado Obtido:** Sucesso. A mensagem de erro é exibida corretamente na interface.

---

### **CT-03: Deve falhar ao realizar login com e-mail válido e senha inválida**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar o bloqueio de acesso ao informar um e-mail correto acompanhado de uma senha incorreta.
* **Passo a Passo para Reprodução:**
  1. Acessar a URL `/signin`.
  2. Clicar no botão/link `"Login"`.
  3. No campo e-mail (`[data-cy="email"]`), digitar `admin@test.com`.
  4. No campo senha (`[data-cy="password"]`), digitar `test987`.
  5. Clicar no botão `"Sign in"`.
* **Resultado Esperado:** O acesso deve ser negado com a exibição do alerta `"Invalid email or password"`.
* **Resultado Obtido:** Sucesso. Tentativa bloqueada com o alerta apropriado.

---

### **CT-04: Deve falhar ao realizar login com e-mail e senha inválidos**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar o bloqueio de acesso quando ambos os campos forem preenchidos com dados inexistentes/inválidos.
* **Passo a Passo para Reprodução:**
  1. Acessar a URL `/signin`.
  2. Clicar no botão/link `"Login"`.
  3. No campo e-mail (`[data-cy="email"]`), digitar `liberta@test.com`.
  4. No campo senha (`[data-cy="password"]`), digitar `test582`.
  5. Clicar no botão `"Sign in"`.
* **Resultado Esperado:** O login deve ser negado e a mensagem `"Invalid email or password"` deve ficar visível.
* **Resultado Obtido:** Sucesso. O acesso é bloqueado conforme esperado.

---

### **CT-05: Exibir mensagem de erro ao deixar o campo Password em branco**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar a obrigatoriedade do preenchimento do campo de senha no formulário de login.
* **Passo a Passo para Reprodução:**
  1. Acessar a URL `/signin`.
  2. Clicar no botão/link `"Login"`.
  3. No campo e-mail (`[data-cy="email"]`), digitar `admin@test.com`.
  4. Deixar o campo de senha (`[data-cy="password"]`) em branco.
  5. Clicar no botão `"Sign in"`.
* **Resultado Esperado:** O formulário não deve submeter e deve exibir o alerta `"Password is required"`.
* **Resultado Obtido:** Sucesso. O alerta de validação do campo é exibido corretamente.

---

### **CT-06: Exibir mensagem de erro ao deixar o campo Email em branco**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar a obrigatoriedade do preenchimento do campo de e-mail no formulário de login.
* **Passo a Passo para Reprodução:**
  1. Acessar a URL `/signin`.
  2. Clicar no botão/link `"Login"`.
  3. Deixar o campo e-mail (`[data-cy="email"]`) em branco.
  4. No campo senha (`[data-cy="password"]`), digitar `test123`.
  5. Clicar no botão `"Sign in"`.
* **Resultado Esperado:** O formulário deve interromper o envio e exibir a validação `"Email is required"`.
* **Resultado Obtido:** Sucesso. A mensagem de erro é exibida abaixo do campo.

---

### **CT-07: Exibir mensagens de erro ao deixar os campos Email e Password em branco**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar que o formulário aciona as mensagens de validação para todos os campos obrigatórios quando enviados em branco.
* **Passo a Passo para Reprodução:**
  1. Acessar a URL `/signin`.
  2. Clicar no botão/link `"Login"`.
  3. Manter os campos de e-mail e senha completamente limpos.
  4. Clicar diretamente no botão `"Sign in"`.
* **Resultado Esperado:** O sistema deve exibir simultaneamente os alertas `"Email is required"` e `"Password is required"`.
* **Resultado Obtido:** Sucesso. Ambas as mensagens de erro são mostradas na tela.

---

### **CT-08: Deve encerrar a sessão e redirecionar para a tela de login ao clicar em logout**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar que ao acionar o encerramento de sessão, a aplicação invalida a autenticação e redireciona o usuário para a tela de login.
* **Passo a Passo para Reprodução:**
  1. Acessar a URL `/signin`.
  2. Realizar o login preenchendo `admin@test.com` e `test123`, e clicar em `"Sign in"`.
  3. Navegar para uma página protegida (ex: clicar no link de rota `/heroes/new`).
  4. Clicar na opção `"Logout"`.
* **Resultado Esperado:** O usuário deve ter a sessão encerrada e a URL deve passar a conter `/signin`.
* **Resultado Obtido:** Sucesso. O logout é executado e o usuário é redirecionado para `/signin`.

# Observações e apontamentos de bugs e melhorias:

1. Feature: Login / Autenticação
🐞BUG-01: Falha no redirecionamento ao efetuar Logout em rota protegida
Prioridade: Alta | Severidade: Alta

Descrição: Ao realizar o Logout estando em uma rota protegida (ex: /heroes/new), a aplicação encerra a sessão mas não redireciona o usuário para a tela de login. A tela do formulário permanece visível.

Passos para Reproduzir:

Efetuar login e acessar a rota /heroes/new.

Clicar no botão de Logout.

Observar a tela e a URL do navegador.

Comportamento Esperado: Redirecionar imediatamente para a tela de login (/signin).

Comportamento Atual: O usuário permanece travado na rota privada /heroes/new após deslogar.

🐞 BUG-02: Disparo de requisição à API com campos obrigatórios pendentes (CT-05)
Prioridade: Média | Severidade: Média

Descrição: Ao tentar submeter o formulário de login com a senha em branco, o front-end exibe a validação local (Password is required), mas ainda realiza a requisição HTTP para a API.

Passos para Reproduzir:

Acessar a tela de login.

Preencher o e-mail e deixar o campo de senha vazio.

Clicar em "Sign in".

Comportamento Esperado: O front-end deve interromper o envio da requisição (event.preventDefault()) ou desabilitar o botão enquanto houver campos vazios.

Comportamento Atual: O sistema exibe o aviso do front e dispara a chamada à API, recebendo a mensagem INVALID EMAIL OR PASSWORD.

💡 MEL-01: Proteção de Rotas Privadas (Redirecionamento para Login)
Prioridade: Alta | Severidade: Alta

Descrição: Garantir que qualquer tentativa de acesso direto via URL a páginas privadas (ex: /heroes/new ou /heroes) por um usuário não autenticado o expulse obrigatoriamente para a tela de login.

Comportamento Esperado: Redirecionar usuários sem token ativo para a rota pública /signin imediatamente.

---

# Feature 2 - Listagem de Heróis
---
### **CT-01: Deve exibir a lista de 7 heróis após login com sucesso**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar que, após realizar o login na aplicação com credenciais válidas e navegar para a rota de heróis, a listagem carrega e exibe exatamente os 7 heróis cadastrados no sistema.
* **Passo a Passo para Reprodução:**
  1. Acessar a aplicação pela URL `/signin`.
  2. Clicar no botão/link `"Login"`.
  3. No campo e-mail (`[data-cy="email"]`), digitar `admin@test.com`.
  4. No campo senha (`[data-cy="password"]`), digitar `test123`.
  5. Clicar no botão `"Sign in"`.
  6. Acessar/navegar para a página `/heroes`.
  7. Verificar a quantidade de cards de heróis exibidos na tela (`[data-cy="hero-card"]`).
* **Resultado Esperado:** A página deve carregar corretamente a listagem e exibir exatamente 7 elementos de cards de heróis (`[data-cy="hero-card"]`).
* **Resultado Obtido:** Sucesso. O sistema autentica o usuário, redireciona para a listagem e valida a exibição exata dos 7 cards de heróis na tela.

# Observações e apontamentos de bugs e melhorias:

#### 🐞 BUG-01: Inconsistência de Roteamento - Mesma URL para telas de Login e Listagem
* **Prioridade:** **Alta**
* **Severidade:** **Alta**
* **Feature:** Listagem de Heróis / Roteamento
* **Descrição:** A aplicação mantém a mesma URL base (ex: `/`) tanto para a tela pública de Login quanto para a tela privada de Listagem de Heróis após a autenticação.
* **Passos para Reproduzir:**
  1. Acessar a URL base da aplicação sem estar autenticado e observar a URL.
  2. Efetuar o login com credenciais válidas.
  3. Observar a URL na tela de Listagem de Heróis.
* **Comportamento Esperado:** A tela de Login deve utilizar uma rota específica (ex: `/signin` ou `/login`) e, após o login, o sistema deve redirecionar para a rota privada da listagem (ex: `/heroes`).
* **Comportamento Atual:** A URL não se altera após a autenticação, mantendo o estado de Login e Dashboard na mesma rota visual.

---

# Feature 3 - Criar novo herói
---
### **CT-01: Deve criar novo herói com sucesso**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar o cadastro completo de um novo herói preenchendo todos os campos do formulário e anexando uma imagem de avatar válida.
* **Passo a Passo para Reprodução:**
  1. Acessar a aplicação em `/signin` e realizar o login com credenciais válidas (`admin@test.com` / `test123`).
  2. Na tela inicial de listagem, clicar no link/botão de criação (`[href="/heroes/new"]`).
  3. Preencher o campo Nome (`[data-cy="nameInput"]`) com `Aerosmith`.
  4. Preencher o campo Preço (`[data-cy="priceInput"]`) com `43`.
  5. Preencher o campo Fãs (`[data-cy="fansInput"]`) com `50`.
  6. Preencher o campo Salvamentos (`[data-cy="savesInput"]`) com `60`.
  7. Selecionar a opção `Mind Control` no campo Poderes (`select[data-cy="powersSelect"]`).
  8. Anexar o arquivo de imagem `cypress/fixtures/Aerosmith.jpg` no campo de Avatar (`[data-cy="avatarFile"]`).
  9. Clicar no botão de submissão do formulário (`Submit`).
* **Resultado Esperado:** O herói deve ser cadastrado na API, o usuário deve ser redirecionado para a rota `/heroes` e o herói "Aerosmith" deve estar visível na listagem.
* **Resultado Obtido:** Sucesso. O herói é cadastrado na API e exibido na listagem corretamente.

---

### **CT-02: Editar herói criado**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar a atualização dos dados e avatar de um herói já existente na lista.
* **Passo a Passo para Reprodução:**
  1. Efetuar o login na aplicação com credenciais válidas.
  2. Garantir a existência de um herói inicial (ex: "Raposa").
  3. Na listagem de heróis, localizar o card do herói "Raposa" e clicar no ícone de edição (`[data-cy="pencil"]`).
  4. Limpar e atualizar o campo Nome para `Cabuloso`.
  5. Atualizar o Preço para `13`, Fãs para `60` e Salvamentos para `90`.
  6. Alterar a seleção do campo Poderes para `Flying`.
  7. Anexar o novo arquivo de avatar `cypress/fixtures/Cabuloso.jpg`.
  8. Clicar no botão `Submit`.
* **Resultado Esperado:** As alterações devem ser salvas na API, o usuário deve ser redirecionado para `/heroes`, o nome "Cabuloso" deve ficar visível na tela e o nome antigo "Raposa" não deve mais existir na listagem.
* **Resultado Obtido:** Sucesso. Os dados do herói são atualizados no banco de dados e refletidos na interface.

---

### **CT-03: Deve exibir mensagens de erro ao tentar criar herói sem preencher todos os campos obrigatórios**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar o acionamento das mensagens de erro de validação ao tentar submeter o formulário de cadastro em branco.
* **Passo a Passo para Reprodução:**
  1. Efetuar o login na aplicação com credenciais válidas.
  2. Navegar para a página de criação de herói (`/heroes/new`).
  3. Clicar diretamente no botão de submissão do formulário sem preencher nenhum campo.
* **Resultado Esperado:** O envio do formulário deve ser bloqueado e as mensagens de erro `"Name is required"`, `"Price is required"`, `"Fans is required"`, `"Saves is required"` e `"Powers is required"` devem ser exibidas abaixo dos respectivos campos.
* **Resultado Obtido:** Sucesso. As mensagens de validação client-side são exibidas corretamente na interface.

---

### **CT-04: Deve exibir mensagem de erro e barrar a criação de herói com valores negativos nos campos numéricos**
* **Status:** 🔴 **Falha** *(Mapeado no BUG-05)*
* **Descrição:** Validar a regra de negócio que impede o cadastro de heróis com valores negativos nos campos numéricos (Preço, Fãs e Salvamentos).
* **Passo a Passo para Reprodução:**
  1. Efetuar o login na aplicação com credenciais válidas.
  2. Acessar o formulário `/heroes/new`.
  3. Preencher o campo Nome com `Cabuloso`.
  4. Preencher o campo Preço com `-43`, Fãs com `-50` e Salvamentos com `-60`.
  5. Selecionar o poder `Mind Control` e anexar uma imagem válida em Avatar.
  6. Clicar no botão de submissão do formulário.
* **Resultado Esperado:** O sistema não deve permitir o cadastro, deve manter a navegação em `/heroes/new` e exibir as mensagens de erro `"Price must be a positive number"`, `"Fans must be a positive number"` e `"Saves must be a positive number"`.
* **Resultado Obtido:** Falha. O sistema aceita a requisição (`POST 201 Created`), não exibe os alertas e redireciona para a lista salvando o herói com dados numéricos negativos.

---

### **CT-05: Não deve permitir Upload de arquivo com extensão não suportada**
* **Status:** 🔴 **Falha** *(Mapeado no BUG-03)*
* **Descrição:** Validar a restrição de formatos de arquivo no upload da imagem de avatar do herói.
* **Passo a Passo para Reprodução:**
  1. Efetuar o login na aplicação com credenciais válidas e ir para `/heroes/new`.
  2. Preencher os campos de texto, numéricos e seleção com dados válidos.
  3. No campo de upload de Avatar (`[data-cy="avatarFile"]`), selecionar um arquivo com extensão não permitida (ex: `cypress/fixtures/114.pdf`).
  4. Clicar no botão de submissão.
* **Resultado Esperado:** A aplicação deve barrar o envio, permanecer em `/heroes/new` e exibir o alerta `"File type not supported"`.
* **Resultado Obtido:** Falha. O sistema aceita o upload do arquivo `.pdf`, conclui o cadastro com sucesso e redireciona para a lista.

---

### **CT-06: Deve cancelar a criação do herói e voltar para a tela de heróis sem criar o herói**
* **Status:** 🔴 **Falha** *(Mapeado no BUG-06)*
* **Descrição:** Validar que ao clicar no botão "Cancel", as informações digitadas são descartadas e o usuário é retornado para a listagem sem cadastrar o registro.
* **Passo a Passo para Reprodução:**
  1. Efetuar o login na aplicação com credenciais válidas e ir para `/heroes/new`.
  2. Preencher parcialmente o formulário (ex: Nome: `Herói Cancelado`, Preço: `100`).
  3. Clicar no botão Cancelar (`[data-cy="cancelButton"]`).
* **Resultado Esperado:** A navegação deve retornar para `/heroes` e o herói "Herói Cancelado" não deve estar listado na tela.
* **Resultado Obtido:** Falha. O elemento com o seletor `[data-cy="cancelButton"]` não existe no DOM da página `/heroes/new`, impedindo a interação de cancelamento.

---

### **CT-07: Exclusão de herói criado**
* **Status:** 🟢 **Sucesso**
* **Descrição:** Validar a exclusão de um herói cadastrado através da interface com modal de confirmação.
* **Passo a Passo para Reprodução:**
  1. Efetuar o login na aplicação com credenciais válidas.
  2. Cadastrar ou identificar um herói específico para exclusão (ex: "Teste Exclusão").
  3. Na página `/heroes`, localizar o card do herói "Teste Exclusão".
  4. Clicar no ícone da lixeira (`[data-cy="trash"]`) presente no card do herói.
  5. No modal de confirmação `"Delete Hero?"`, verificar a mensagem e clicar no botão `"Yes"`.
* **Resultado Esperado:** O modal de confirmação deve ser exibido, a requisição `DELETE` deve ser enviada para a API e o herói "Teste Exclusão" deve ser removido da tela.
* **Resultado Obtido:** Sucesso. O fluxo de confirmação e a requisição de exclusão na API funcionam corretamente.

---

### **CT-08: Aplicação deve barrar criação de herói com mesmo nome de um já existente**
* **Status:** 🔴 **Falha** *(Mapeado no BUG-04)*
* **Descrição:** Validar a regra de unicidade de nome do herói no cadastro.
* **Passo a Passo para Reprodução:**
  1. Efetuar o login na aplicação e navegar até `/heroes/new`.
  2. Preencher o campo Nome com um nome que já pertence a outro herói cadastrado no sistema (ex: `Aerosmith`).
  3. Preencher os demais campos com dados válidos e anexar uma imagem de avatar.
  4. Clicar no botão de submissão (`Submit`).
* **Resultado Esperado:** O cadastro deve ser barrado, a rota deve ser mantida em `/heroes/new` e a mensagem de erro `"Hero already exists"` deve ser exibida.
* **Resultado Obtido:** Falha. A aplicação não realiza a validação de duplicidade, aceita a requisição (`POST 201 Created`) e gera registros duplicados na listagem.


# Observações e apontamentos de bugs e melhorias:

### BUG-01: Upload de arquivo com extensão não suportada (PDF) no Avatar
* **Prioridade:** **Alta**
* **Severidade:** **Alta**
* **Feature:** Cadastro de Heróis (`/heroes/new`)
* **Descrição:** O campo de upload do avatar aceita arquivos com extensões não permitidas (ex: arquivos `.pdf`), concluindo a criação do herói e o envio do arquivo inválido.
* **Passos para Reproduzir:**
  1. Acessar o formulário de cadastro de herói em `/heroes/new`.
  2. No campo de upload do avatar (`[data-cy="avatarFile"]`), selecionar um arquivo `.pdf`.
  3. Preencher os demais campos obrigatórios com dados válidos.
  4. Submeter o formulário clicando em `Submit`.
* **Comportamento Esperado:** A aplicação deve validar a extensão e o tipo do arquivo, barrar o envio e exibir a mensagem de erro `"File type not supported"`.
* **Comportamento Atual:** O backend aceita o arquivo (`POST 201 Created`) na rota `/avatar` e conclui o cadastro do herói com o arquivo PDF.

---

### BUG-02: Permissão de cadastro de heróis com nomes duplicados
* **Prioridade:** **Alta**
* **Severidade:** **Alta**
* **Feature:** Cadastro de Heróis (`/heroes/new`)
* **Descrição:** A aplicação permite cadastrar múltiplos heróis com exatamente o mesmo nome, sem realizar a validação de unicidade do registro.
* **Passos para Reproduzir:**
  1. Cadastrar um herói com o nome `"Herói Teste"`.
  2. Tentar cadastrar um segundo herói utilizando o mesmo nome `"Herói Teste"`.
  3. Submeter o formulário clicando em `Submit`.
* **Comportamento Esperado:** O sistema deve impedir a criação, manter o usuário na rota `/heroes/new` e exibir a mensagem de erro `"Hero already exists"`.
* **Comportamento Atual:** O backend aceita a requisição (`POST 201 Created`) e redireciona para a lista em `/heroes`, gerando dois registros idênticos.

---

### BUG-03: Permissão de valores negativos nos campos numéricos
* **Prioridade:** **Média**
* **Severidade:** **Média**
* **Feature:** Cadastro de Heróis (`/heroes/new`)
* **Descrição:** O sistema aceita valores negativos nos campos de preço, fãs e salvamentos (`price`, `fans`, `saves`), salvando o registro com dados inconsistentes no banco de dados.
* **Passos para Reproduzir:**
  1. Acessar a tela de cadastro de herói em `/heroes/new`.
  2. Preencher os campos numéricos com valores negativos (ex: `-10`, `-50`, `-60`).
  3. Submeter o formulário.
* **Comportamento Esperado:** O sistema deve barrar a submissão e exibir mensagens de validação (ex: `"Price must be a positive number"`).
* **Comportamento Atual:** O backend aceita a requisição (`POST 201 Created`) e cadastra o herói mantendo os valores numéricos negativos.

---

### BUG-04: Botão "Cancelar" ausente no formulário de cadastro
* **Prioridade:** **Baixa**
* **Severidade:** **Baixa**
* **Feature:** Cadastro de Heróis (`/heroes/new`)
* **Descrição:** A interface do formulário não disponibiliza um botão para desistir do cadastro e retornar para a listagem principal, forçando o usuário a navegar pelo menu superior ou pela URL.
* **Passos para Reproduzir:**
  1. Acessar a rota `/heroes/new`.
  2. Procurar pelo botão de cancelamento na interface/DOM.
* **Comportamento Esperado:** Existir um botão `Cancel` com o seletor `[data-cy="cancelButton"]` que redirecione o usuário de volta para a rota `/heroes`.
* **Comportamento Atual:** O elemento com o atributo `[data-cy="cancelButton"]` não existe no DOM da página.

---

### MEL-01: Falta de mensagem de confirmação (Toast/Alert) ao criar herói
* **Prioridade:** **Média**
* **Severidade:** **Média**
* **Feature:** Cadastro de Heróis (`/heroes/new`) / Feedback visual
* **Descrição:** Após cadastrar um novo herói com sucesso, o sistema redireciona o usuário diretamente para a página de listagem sem emitir nenhum feedback visual de confirmação da operação.
* **Passos para Reproduzir:**
  1. Acessar a rota `/heroes/new`.
  2. Preencher todos os campos corretamente e clicar em `Submit`.
  3. Observar o comportamento da interface durante e após o redirecionamento.
* **Comportamento Esperado:** Exibir um alerta temporário (notificação Toast) informando `"Herói criado com sucesso!"` durante ou logo após o redirecionamento para a listagem.
* **Comportamento Atual:** O redirecionamento para a rota `/heroes` ocorre de forma instantânea, sem qualquer notificação de confirmação visual para o usuário.
---

# Feature 4 - Criar novo herói

### CT-01 — Tentativa de acesso direto à rota `/heroes` sem autenticação

- **Status:** 🟡 **Inconsistência de Arquitetura**
- **Descrição:** Validar o comportamento do sistema ao tentar acessar a rota `/heroes` sem estar autenticado.
- **Resultado Esperado:** O sistema deve barrar o acesso e redirecionar para a tela de login (`/signin`) ou carregar estritamente a visão pública, sem controles administrativos.
- **Resultado Obtido:** A URL para os estados autenticado e não autenticado é a mesma (`/heroes`). A rota é compartilhada na UI, exibindo a versão pública da aplicação.

---

### CT-02 — Acesso direto à rota de criação `/heroes/new` sem autenticação

- **Status:** 🔴 **Falha (BUG-02)**
- **Descrição:** Validar se a rota protegida `/heroes/new` exige autenticação.
- **Resultado Esperado:** O sistema deve realizar o redirecionamento automático e imediato para a tela de login (`/signin`).
- **Resultado Obtido:** O sistema redirecionou para o formulário de criação de novo herói sem exigir usuário e senha.

---

### CT-03 — Validação de permissões de UI para perfil Administrador

- **Status:** 🟢 **Sucesso**
- **Descrição:** Validar a exibição dos elementos de controle após o login com um usuário Administrador.
- **Resultado Esperado:** Redirecionar para `/heroes`, exibir o botão **"Novo Herói"** no topo e os quatro ícones (**Curtir, Preço, Editar e Excluir**) em cada card.
- **Resultado Obtido:** O sistema redirecionou com sucesso, o botão **"Novo Herói"** ficou visível e clicável, e os quatro ícones ficaram disponíveis em todos os cards.

---

### CT-04 — Encerrar sessão via botão Logout

- **Status:** 🟢 **Sucesso**
- **Descrição:** Validar a revogação dos acessos administrativos após a realização do Logout.
- **Resultado Esperado:** Redirecionar para `/signin`, limpar a sessão local e remover os botões de edição e exclusão.
- **Resultado Obtido:** O sistema redirecionou para a tela de login. Os cards passaram a exibir apenas dois ícones (**Curtir e Preço**) e, ao clicar em qualquer um deles, foi exigido login por meio do popup *"You must log in to..."*.

---

### CT-05 — Tentar voltar pelo histórico do navegador após Logout

- **Status:** 🟢 **Sucesso**
- **Descrição:** Validar se a ação de "Voltar" do navegador expõe dados armazenados em cache após o Logout.
- **Resultado Esperado:** A página de heróis não deve ser carregada com dados privados ou ações administrativas. O acesso deve ser bloqueado ou permanecer no estado não autenticado.
- **Resultado Obtido:** O sistema permaneceu no estado não autenticado, mantendo apenas os dois ícones públicos por card e exigindo login ao tentar interagir com as funcionalidades protegidas.

---

### CT-06 — Invalidação manual do token `auth_result` em runtime

- **Status:** 🔴 **Falha (BUG-03)**
- **Descrição:** Validar a reação da interface quando o token de autenticação é removido do `localStorage` durante o uso da aplicação.
- **Resultado Esperado:** A interface deve interceptar o erro de autorização ou ausência do token e redirecionar o usuário para uma rota não autenticada ao tentar realizar uma ação protegida.
- **Resultado Obtido:** Após apagar o token e clicar em **"Create New Hero"**, a aplicação navegou diretamente para a tela de criação de herói, permitindo acesso à funcionalidade sem autenticação.

---

### CT-07 — Acesso direto a ID de herói inexistente `/heroes/edit/99999`

- **Status:** 🔴 **Falha (BUG-04)**
- **Descrição:** Validar o tratamento de erro ao tentar acessar a edição de um ID de herói inexistente.
- **Resultado Esperado:** A interface não deve apresentar uma tela em branco ou interromper sua execução. Deve exibir uma mensagem amigável informando que o herói não foi encontrado.
- **Resultado Obtido:** Ao acessar diretamente a URL `/heroes/edit/99999`, a tela ficou totalmente em branco, caracterizando uma falha no tratamento do ID inexistente.

---

### CT-08 — Sincronização de Sessão e Logout em Múltiplas Abas (Multitabs)

- **Tipo de Teste:** 🖐️ Manual
- **Status:** 🔴 **Falha (BUG-05)**
- **Descrição:** Validar se o encerramento da sessão (Logout) em uma aba do navegador reflete e invalida automaticamente a sessão ativa em outra aba aberta da mesma aplicação.
- **Resultado Esperado:** Ao efetuar o Logout na **Aba A**, a **Aba B** deve sincronizar o estado de autenticação, revogando o acesso do usuário, seja por meio de redirecionamento automático para a tela de login ou bloqueando ações restritas ao tentar interagir.
- **Resultado Obtido:** Ao realizar o Logout na **Aba A**, a **Aba B** permaneceu exibindo a interface de Administrador com todos os controles visíveis e ativos. Ao clicar em recursos de Admin na **Aba B**, a aplicação permitiu a navegação e a execução de ações sem exigir reautenticação.

# Observações e apontamentos de bugs e melhorias:

### BUG-02: Bypass de Proteção de Rota na tela de criação de herói (/heroes/new)
* **Prioridade:** **Crítica** | **Severidade:** **Crítica**
* **Feature:** Controle de Permissão (UI) / Proteção de Rotas
* **Descrição:** Qualquer usuário não autenticado consegue acessar diretamente a URL `/heroes/new` e visualizar o formulário de cadastro de heróis sem digitar credenciais.
* **Passos para Reproduzir:**
  1. Abrir uma aba anônima no navegador.
  2. Digitar a URL: `http://localhost:3000/heroes/new`.
* **Comportamento Esperado:** O Route Guard deve interceptar a requisição e redirecionar o usuário anônimo para a página de login (`/signin`).
* **Comportamento Atual:** O formulário de criação de herói é renderizado normalmente.

---

### BUG-03: Falta de revalidação de sessão no localStorage antes da navegação interna
* **Prioridade:** **Alta** | **Severidade:** **Alta**
* **Feature:** Controle de Permissão (UI) / Gestão de Sessão
* **Descrição:** A UI não verifica a existência da chave `auth_result` ao disparar eventos de navegação para rotas internas.
* **Passos para Reproduzir:**
  1. Logar como `admin@test.com`.
  2. Apagar a chave `auth_result` no DevTools (`Application` -> `Local Storage`).
  3. Clicar no botão "Create New Hero" no topo da página.
* **Comportamento Esperado:** A UI deve identificar a ausência da chave e redirecionar imediatamente para a tela de login.
* **Comportamento Atual:** A aplicação navega para `/heroes/new`.

---

### BUG-04: Crash de interface (White Screen) ao acessar URL de recurso inexistente
* **Prioridade:** **Alta** | **Severidade:** **Alta**
* **Feature:** Controle de Permissão (UI) / Tratamento de Erros
* **Descrição:** A navegação para um ID de herói que não existe na base faz a aplicação React/Vue quebrar o ciclo de renderização, deixando a tela totalmente em branco.
* **Passos para Reproduzir:**
  1. Estar autenticado no sistema.
  2. Digitar a URL `http://localhost:3000/heroes/edit/99999` na barra de endereço.
* **Comportamento Esperado:** Exibir uma mensagem de erro amigável (ex: "Herói não encontrado") e manter o layout da aplicação ativo.
* **Comportamento Atual:** A tela apaga completamente e fica totalmente em branco.

---

### BUG-05: Trativa de erro inadequada e ausência de redirecionamento em sessões expiradas/concorrentes
* **Prioridade:** **Média** | **Severidade:** **Média**
* **Feature:** Controle de Permissão (UI) / Concorrência
* **Descrição:** Quando uma requisição falha por falta de autorização (401/403) em abas concorrentes, a UI exibe apenas uma mensagem genérica "Something went wrong" sem encerrar a sessão local.
* **Passos para Reproduzir:**
  1. Abrir a aplicação logada na Aba A e na Aba B.
  2. Na Aba A, clicar em Logout.
  3. Na Aba B, clicar em Editar um herói e submeter o formulário.
* **Comportamento Esperado:** O interceptor HTTP deve capturar a falha 401, exibir a mensagem "Sessão expirada" e redirecionar a Aba B para a tela de login.
* **Comportamento Atual:** Exibe o popup "Something went wrong" e mantém o usuário na tela autenticada quebrada.

