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

# Feature Login
---

### CT-01: Login com dados válidos

Descrição: Acessei a tela inicial, abri o modal de login, informei um e-mail e uma senha cadastrados no sistema e cliquei no botão para entrar.

- Resultado Esperado: O sistema deve autenticar o usuário com sucesso, fechar o modal de login e exibir o botão de Logout na tela.

- Resultado Obtido: O login foi realizado sem erros e o botão de Logout ficou visível.

---

### CT-02: Login com e-mail e senha inválidos

Descrição: Tentei realizar o login informando um e-mail não cadastrado e uma senha incorreta.

- Resultado Esperado: O sistema deve recusar o acesso, manter o modal aberto e exibir uma mensagem informando que as credenciais são inválidas.

- Resultado Obtido: A requisição retornou erro de autenticação *(401), o modal permaneceu aberto e o acesso foi negado.

---

### CT-03: Login com e-mail válido e senha inválida

Descrição: Digitei um e-mail correto e cadastrado, mas preenchi o campo de senha com um valor incorreto.

- Resultado Esperado: O sistema não deve permitir o login e deve alertar que a senha está incorreta.

- Resultado Obtido: A autenticação falhou, o usuário não foi logado e o modal continuou aberto exibindo o alerta.

---

### CT-04: Login com e-mail inválido e senha válida

Descrição: Digitei um e-mail incorreto/inexistente e preenchi o campo com uma senha válida.

- Resultado Esperado: O sistema deve recusar a tentativa de login e informar que o usuário/e-mail não foi encontrado.

- Resultado Obtido: O login foi bloqueado pelo sistema, que retornou erro de autenticação e manteve o modal na tela.

---

### CT-05: Login sem preencher a senha

Descrição: Preenchi o campo de e-mail com um valor válido, deixei o campo de senha em branco e cliquei em "Sign in".

- Resultado Esperado: O sistema deve barrar o envio no front-end, alertando que a senha é obrigatória.

- Resultado Obtido: Foram exibidas as mensagens "Password is required" e "Invalid email or password", mantendo o modal aberto.

---

### CT-06: Login sem preencher o e-mail

Descrição: Deixei o campo de e-mail em branco, preenchi a senha e tentei realizar o login.

- Resultado Esperado: O sistema deve impedir a tentativa e solicitar o preenchimento do e-mail.

- Resultado Obtido: A ação foi bloqueada no formulário e a validação de campo obrigatório foi exibida.

---

### CT-07: Login com ambos os campos em branco

- Descrição: Abri o modal de login e cliquei diretamente no botão de confirmação sem preencher e-mail ou senha.

- Resultado Esperado: O formulário deve destacar a obrigatoriedade dos dois campos e impedir o envio.

- Resultado Obtido: O formulário não enviou a requisição e sinalizou a falta do preenchimento nos dois campos.

# Observações e apontamentos de bugs:

1- CT 05 - Ao deixar o campo de senha em branco e clicar em "Sign in", o sistema exibe o alerta do front end (Password is required) e também a requisição à API exibindo a mensagem da API(iNVALID EMAIL OR PASSWORD).

- Sugestão: O front-end deve interromper o envio da requisição, deixando o botão submit "inclicável" enquanto houver campos obrigatórios pendentes.

---

