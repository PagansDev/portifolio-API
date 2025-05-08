# Portfólio API

API para gerenciamento de portfólio profissional, agora desenvolvida com **Laravel 11**, MySQL e autenticação via Sanctum.

> **Versão 2.0.0** – Refactor completo: API reescrita em Laravel, com autenticação, documentação Swagger e pronta para deploy no Railway.

Você tem um portfólio e está cansado de atualizar manualmente (hardcoded) seus projetos pessoais? Basta utilizar essa API e fazer o deploy no Railway.

Essa API irá prover URLs para a miniatura do projeto (suba sua miniatura em algum serviço de imagem com link público), do repositório no github, do deploy da aplicação, assim como uma descrição e tecnologias utilizadas.

Com a aplicação rodando, basta consumi-la no front-end com seus componentes dinâmicos e popular seu portfólio.

## Tecnologias Utilizadas

-   Laravel 11
-   MySQL
-   Sanctum (autenticação via token)
-   Swagger (Documentação)
-   Railway (Deploy)

### Variáveis de Ambiente

O projeto pode ser configurado de duas formas:

#### **1. Ambiente Local (usando variáveis separadas)**

```
APP_KEY= # Gere com php artisan key:generate --show
APP_ENV=production
APP_DEBUG=false
APP_URL=https://<seu-projeto>.up.railway.app
DB_CONNECTION=mysql
DB_HOST=<host do banco>
DB_PORT=3306
DB_DATABASE=<nome do banco>
DB_USERNAME=<usuário do banco>
DB_PASSWORD=<senha do banco>
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1
SESSION_DRIVER=cookie
```

#### **2. Deploy Railway (usando DATABASE_URL)**

No painel da Railway, basta adicionar:

```
DATABASE_URL=mysql://usuario:senha@host:porta/banco
APP_KEY= # Gere localmente com php artisan key:generate --show
APP_ENV=production
APP_DEBUG=false
APP_URL=https://<seu-projeto>.up.railway.app
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1
SESSION_DRIVER=cookie
```

> O arquivo `config/database.php` já está preparado para ler e parsear a variável `DATABASE_URL` automaticamente, não sendo necessário definir DB_HOST, DB_DATABASE, etc, separadamente na Railway.

## 🔧 Instalação Local

1. Clone o repositório

```bash
git clone https://github.com/pagansdev/portfolio-api.git
cd portfolio-api
```

2. Instale as dependências

```bash
composer install
```

3. Configure o `.env` conforme acima e gere a chave:

```bash
php artisan key:generate
```

4. Rode as migrations:

```bash
php artisan migrate
```

5. Rode o servidor local:

```bash
php artisan serve
```

### Deploy no Railway

1. Faça login na sua conta do Railway
2. Crie um novo projeto
3. Adicione um serviço MySQL
4. No serviço MySQL, clique em "Connect" e copie a variável `DATABASE_URL`
5. Conecte seu repositório GitHub ao projeto
6. No seu projeto, adicione as variáveis de ambiente do `.env` no painel da Railway (incluindo `DATABASE_URL` e `APP_KEY`)
7. Crie um arquivo `Procfile` com:
    ```
    web: php artisan serve --host=0.0.0.0 --port=8080
    ```
8. O Railway fará o deploy automático após cada push
9. Gere o domínio público em Settings > Networking > Generate Domain
10. Use a API normalmente!

## Documentação da API

A documentação da API está disponível em `/api/documentation` após o deploy. Ela foi criada usando Swagger (L5 Swagger) e contém todas as rotas disponíveis, seus parâmetros e exemplos de uso.

## Estrutura do Projeto

```
app/
├── Http/Controllers/       # Controladores da aplicação
├── Models/                 # Modelos Eloquent
├── Providers/              # Providers
config/                     # Configurações
routes/
│   ├── api.php             # Rotas da API
│   └── web.php             # Rotas web
resources/views/            # Views (se necessário)
database/migrations/        # Migrations
public/                     # Pasta pública
```

## Funcionalidades

-   CRUD de projetos
-   Autenticação via Sanctum (login, registro, logout)
-   Documentação automática da API (Swagger)
-   CORS configurado
-   Pronto para deploy no Railway

## Observações

-   O projeto está configurado para rodar em produção no Railway
-   Todas as conexões com o banco de dados são feitas via variáveis de ambiente
-   A documentação da API é atualizada automaticamente com as alterações no código
-   Versão **2.0.0** – API reescrita em Laravel
