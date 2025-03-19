FROM node:23-alpine3.21

# Criar o diretório app
WORKDIR /usr/src/app

# Instalar as dependências
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Porta a ser escutada
EXPOSE 3000

# Inicializar
CMD [ "npm", "run", "start:migrate:deploy" ]