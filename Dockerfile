# Etapa base
FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código (incluindo tsconfig.json)
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "run", "dev"]
