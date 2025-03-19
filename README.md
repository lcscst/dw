# Projeto JIL - 2024.2

1. Adicionado o PRISMA ORM ao projeto (diretório prisma/)
2. Dentro do `prisma/` há o seguinte:
   1. `migrations/`: scripts de configuração do DB gerado automaticamente pelo Prisma
   2. O `dev.db` é o DB SQLite usado no momento da modificação (para usar outro banco, basta modificar `DATABASE_URL` no arquivo `.env` e no `prisma/schema.prisma` modificar o seguinte trecho:
        ```js   
            datasource db {
                provider = "mysql"
                url      = env("DATABASE_URL")
            }
        ```
    3. Para mais detalhes: https://www.prisma.io/docs/orm/overview/databases/mysql
    4. O arquivo `prisma/seed.js` é o script que adicionará os dados iniciais no DB
    5. Para gerar uma nova migração, caso altere algo no `prisma/schema.prisma`, utilizar o comando: `npx prisma migrate dev --name init`
    6. Rodando isto, ele também executa o script `prisma/seed.js`
    7. Caso não execute, é só rodar o comando: `npx prisma db seed`
 3. Movido os arquivos do front-end para o diretório `/public`
 4. O back-end ficou dentro do diretório `/src`
    1. Dentro do back-end há lógicas de hash de senha: `src/core/hash.js`
    2. Cliente Prisma ORM para interação com DB: `src/core/prisma.js`
    3. Variavéis de ambiente que estão no `.env` estão organizadas em `src/core/config.js`
    4. Middleware para proteger as rotas por falta de token JWT, ou seja, só poderão usar uma rota da API se estiveram devidamente logados com um token válido: `src/middleware/auth.js` (vide as rotas `router.get('/users', isAuthenticated, async (req, res) =>`, onde o `isAuthenticated` estará definido)
    5. Todas as rotas foram separadas em seus devidos arquivos em `src/routes`
    6. O arquivo `main.js`é o arquivo principal do servidor
 5. No front-end, para logar o usuário com as novas lógicas, foi criado um arquivo em `public/js/auth.js`. Aqui está a lógica de login do usuário, obtendo erros vindos diretamento do back-end: se o usuário for logado, salva o token, id e username no localStorage
 6. O arquivo `public/js/auth.js` substitui o `public/js/main.js`
 7. O arquivo `public/js/api.js` foi modificado e agora não precisa do `BASEURL`, basta passar o caminho normal que irá funcionar, e o projeto agora é Server Side Rendering (SSR), ou seja, tudo é carregado no lado do servidor
 8. Uma nova interação adicionada com back-end no arquivo `public/js/api.js`:
    
    ```js

        export const currentUser = async () => {
            const response = await fetch('/users/me', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jiltoken')}`
                }
            });
            return response.json();
        }

    ```

   1.  Se o usuário estiver devidamente autenticado com token JWT válido, fará uma requisição no back-end e pegará os dados do usuário, trazendo id e username
   2.  Isso é executado no `public/js/auth.js` na linha 36
   3.  Para deslogar o usuário, foi criado o arquivo `public/js/logout.js` e inserido no arquivo `jil.html`: quando o usuário clicar em `Sair do JIL`, ele removerá os dados do usuário e o token de acesso do localStorage
   4.  Isto também redireciona o usuário para a página de login
   5.  Todo o projeto foi reorganizado para funcionar com Express
   6.  Para testar: antes de tudo, se estiver sem o `node_modules`, execute o comando dentro da raiz do projeto `npm i` para instalar as dependências do projeto
   7.  Para todo o projeto funcionar, execute `npm run start` e abra o link `http://locahost:3000`

# IMPORTANTE

`npx prisma migrate dev --name init` + `npm install ping` + `npm run start`

As pastas `node_modules` e `migration` e o arquivo `dev.db` devem ser removidos para forçar atualizações!

# .env
`DATABASE_URL="file:./dev.db"`
`SECRET_KEY="ad51eb89-2944-4861-b9a7-8ae46b4a2d06"`
