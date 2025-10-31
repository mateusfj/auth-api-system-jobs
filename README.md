# 🛡️ Auth Service — Clean Architecture & DDD

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)]()
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)]()

> Microserviço de autenticação desenvolvido com princípios de **DDD**, **Clean Architecture** e **SOLID**, utilizando **JWT**, **Redis**, e **Class Validator**.  
> O projeto foi totalmente conteinerizado com **Docker**, garantindo portabilidade e estabilidade no ambiente de desenvolvimento.

---

## 📖 Sumário

- [🚀 Tecnologias](#-tecnologias)
- [🧠 Conceitos aplicados](#-conceitos-aplicados)
- [📂 Estrutura do projeto](#-estrutura-do-projeto)
- [⚙️ Instalação e execução](#️-instalação-e-execução)
- [🔑 Autenticação](#-autenticação)
- [🐳 Docker](#-docker)
- [🧩 Padrões de projeto](#-padrões-de-projeto)

---

## 🚀 Tecnologias

- **Node.js** (>=18)
- **TypeScript**
- **NestJS** _(ou framework equivalente, se usado)_
- **JWT (JSON Web Token)** — geração e validação de tokens de acesso
- **Redis** — cache e armazenamento dos _refresh tokens_
- **Class Validator** — validação robusta de dados de entrada
- **Docker & Docker Compose** — ambiente isolado e reprodutível
- **ESLint + Prettier** — padronização de código
- **SOLID + Clean Architecture + DDD**

---

## 🧠 Conceitos aplicados

O projeto foi construído com foco em **manutenibilidade**, **testabilidade** e **baixo acoplamento**, aplicando:

- **Domain-Driven Design (DDD):** separação clara entre _domínio_, _aplicação_, _infraestrutura_ e _interfaces_.
- **Clean Architecture:** dependências sempre apontam para o domínio.
- **SOLID:** princípios aplicados para garantir extensibilidade e coesão.
- **Factory Pattern:** criação controlada de objetos de domínio.
- **Notification Pattern:** coleta e tratamento centralizado de erros e notificações.

---

## 📂 Estrutura do projeto

```bash
src/
│
├── domain/
│   └── auth/
│       ├── entities/
│       └── repository/
│
├── application/
│   └── auth/
│       └── usecases/
│
├── modules/
│   ├── auth/
│   ├── cache/
│   └── database/
│
├── infra/
│   ├── filters/
│   ├── providers/
│   └── repositories/
│
├── main.ts
│
└── shared/
    └── utils/
```

Cada camada tem responsabilidades bem definidas e desacopladas, permitindo evoluções e substituições sem impacto direto nas demais.

---

## ⚙️ Instalação e execução

🔧 Pré-requisitos

Node.js 18+

Docker e Docker Compose

🪜 Passos

1️⃣ Clone o repositório

```bash
git clone https://github.com/mateusfj/auth-microservice.git
cd auth-service
```

2️⃣ Instale as dependências

```bash
npm install
```

3️⃣ Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

---

## 🔑 Autenticação

O serviço utiliza JWT para autenticação, com:

Access Token: curto prazo, usado nas requisições autenticadas.

Refresh Token: armazenado no Redis, garantindo segurança e performance.

Fluxo

Usuário faz login → recebe access_token e refresh_token

access_token é usado em headers (Authorization: Bearer <token>)

Quando expira, o sistema usa o refresh_token do Redis para gerar um novo.

🐳 Docker

O projeto possui configuração pronta via Docker Compose para rodar o app e o Redis.

# Subir os containers

```bash
docker-compose up -d
```

# Parar os containers

```bash
docker-compose down
```

---

## 🧩 Padrões de projeto

Factory Pattern: encapsula a lógica de criação de entidades e objetos complexos.

Notification Pattern: centraliza notificações e validações, evitando propagação de erros.

Dependency Inversion: camadas de domínio não conhecem a infraestrutura.

Repository Pattern: abstrai o acesso a dados (banco, cache, etc).

“A arquitetura limpa não é sobre frameworks, é sobre independência de detalhes.”
— Uncle Bob
