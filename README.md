# Front-End Vansly

Sistema de gerenciamento de Vans Universítárias 

# 🚀 Como subir o sistema Vansly

Este guia explica como clonar e rodar um projeto ReactJS localmente.

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- [Git](https://git-scm.com/)

Verifique as versões com:

```bash
node -v
npm -v
git --version 
```

# 📦 Clonando o projeto
Clone o repositório para sua máquina local:

```bash
git clone https://github.com/gustavobraga1001/vite-vansly.git
```
Entre na pasta do projeto:

```bash
cd vite-vasnly
```

# 📁 Instalando dependências
Instale as dependências do projeto com:

```bash
npm install
```

ou, se estiver usando yarn:

```bash
yarn install
```

# ▶️ Rodando o projeto
Para iniciar o servidor de desenvolvimento, execute:

```bash
npm start
```

ou

```bash
yarn start
```

O projeto estará disponível em:

```bash
http://localhost:3000
```

## Funcionalidades do sistema na versão atual V(1.0)

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar como um passageiro; 
- [x] Deve ser possível se autenticar;   
- [x] Deve ser possível um passageiro visualizar ofertas de serviço;   
- [] Deve ser possível um passageiro filtrar ofertas de serviço;   
- [x] Deve ser possível um passageiro contratar um serviço;   
- [x] Deve ser possível um passageiro confirmar falta;   
- [x] Deve ser possível um passageiro acompanhar um trajeto;   
- [x] Deve ser possível se cadastrar um motorista;   
- [x] Deve ser possível um motorista cadastrar um veiculo;  
- [x] Deve ser possível um motorista anunciar um serviço;   
- [x] Deve ser possível um motorista iniciar um trajeto;   
- [x] Deve ser possível um motorista confirmar o embarque de um passageiro;   

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não deve poder confirmar mais de uma falta no mesmo dia;
- [x] O passageiro não pode estar na rota se tiver uma falta no dia atual;
- [x] O motorista não pode iniciar uma rota sem no minimo um passageiro na rota;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário tem que estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um bando PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (Json Web Token);