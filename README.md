# Cypress Test Queue

Este projeto implementa uma aplicação para cadastrar testes em uma fila usando RabbitMQ e executá-los com Cypress. A
interface web é construída com React, o backend com Node.js e Express, e um worker em Node.js é responsável por consumir
a fila e rodar os testes.

## Estrutura do Projeto

```

cypress-test-queue/
├── backend/
│ ├── node_modules/
│ ├── worker.js
│ ├── index.js
│ ├── package.json
│ ├── package-lock.json
├── frontend/
│ ├── node_modules/
│ ├── public/
│ │ ├── index.html
│ ├── src/
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── App.css
│ │ ├── ...
│ ├── package.json
│ ├── package-lock.json
├── docker-compose.yml
├── requests.http

```

## Componentes

### Frontend

- **Localização:** `frontend/`
- **Tecnologia:** React
- **Descrição:** Aplicação de frontend com um formulário para cadastrar novos testes. Os dados do formulário são enviados ao backend via requisições HTTP.

### Backend

- **Localização:** `backend/`
- **Tecnologia:** Node.js, Express
- **Descrição:** Servidor que recebe as requisições HTTP do frontend, processa os dados dos testes e os envia para a fila do RabbitMQ.

### Worker

- **Localização:** `backend/worker.js`
- **Tecnologia:** Node.js, Cypress
- **Descrição:** Serviço que consome mensagens da fila do RabbitMQ e executa os testes usando Cypress.

### RabbitMQ

- **Localização:** Configuração no arquivo `docker-compose.yml`
- **Tecnologia:** RabbitMQ (Docker)
- **Descrição:** Sistema de mensageria que gerencia a fila de testes. Permite a comunicação assíncrona entre o backend e o worker.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- Docker e Docker Compose instalados

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/cypress-test-queue.git
   cd cypress-test-queue
   ```

2. **Inicie o RabbitMQ:**
   ```bash
   docker-compose up -d
   ```

3. **Instale as dependências do frontend:**
   ```bash
   cd frontend
   npm install
   ```

4. **Inicie o frontend:**
   ```bash
   npm start
   ```

5. **Instale as dependências do backend:**
   ```bash
   cd ../backend
   npm install
   ```

6. **Inicie o servidor backend:**
   ```bash
   node index.js
   ```

7. **Inicie o worker:**
   ```bash
   node worker.js
   ```

### Utilizando o Projeto

1. Acesse a aplicação React no navegador através de `http://localhost:3000`.
2. Preencha o formulário com os dados do teste (nome e URL do arquivo de teste Cypress) e clique em "Cadastrar Teste".
3. O backend receberá a requisição e enfileirará o teste no RabbitMQ.
4. O worker consumirá a mensagem da fila e executará o teste com Cypress.

### Testando a Integração

Utilize o arquivo `requests.http` para enviar requisições diretamente ao backend. Abra o arquivo no seu editor de código
com a extensão "REST Client" e clique em "Send Request" para enviar cada requisição.

### Estrutura de Pastas

- `backend/`: Contém o servidor backend e o worker.
- `frontend/`: Contém a aplicação React.
- `docker-compose.yml`: Configuração do RabbitMQ com Docker.
- `requests.http`: Arquivo com diversas requisições de exemplo para testar o backend.

### Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
