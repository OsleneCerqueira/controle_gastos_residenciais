# Controle de Gastos Residenciais

Aplicação full stack para cadastrar pessoas e suas transações financeiras, acompanhar receitas e despesas e consultar o saldo individual e geral da residência.

## Funcionalidades

- Cadastro, listagem, consulta e exclusão de pessoas.
- Cadastro e listagem paginada de transações.
- Histórico com 10 transações por página, ordenadas da mais recente para a mais antiga.
- Exclusão automática das transações quando uma pessoa é removida.
- Totais de receitas, despesas e saldo por pessoa.
- Totais consolidados de todas as pessoas.
- Validação de formulários no frontend e de contratos no backend.
- Persistência dos dados em MySQL por meio do Entity Framework Core.

## Regras de negócio

- Cada pessoa possui identificador único gerado pelo banco, nome e idade.
- Cada transação possui identificador único, descrição, valor, tipo e uma pessoa responsável.
- Uma transação só pode ser criada para uma pessoa cadastrada.
- Pessoas menores de 18 anos podem registrar somente despesas.
- O valor de uma transação deve ser maior que zero.
- O saldo é calculado como `receitas - despesas`.
- Ao excluir uma pessoa, todas as suas transações são excluídas por relacionamento em cascata.

## Tecnologias

### Backend

- .NET 10 e ASP.NET Core
- C#
- Entity Framework Core 9
- Pomelo Entity Framework Core para MySQL
- OpenAPI e Swagger UI

### Frontend

- React 19
- TypeScript 6
- Vite 8
- React Router
- CSS Modules

## Estrutura do projeto

O backend separa endpoints, regras de negócio, contratos e persistência. O frontend é organizado por funcionalidade, mantendo páginas, componentes, chamadas à API e tipos próximos do domínio ao qual pertencem.

## Pré-requisitos

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) compatível com o Vite 8
- MySQL
- Ferramenta `dotnet-ef` compatível com o Entity Framework Core 9


## Como executar o projeto
1. Clonar o repositório

Abra o terminal e execute:

git clone `https://github.com/OsleneCerqueira/controle_gastos_residenciais.git`

Entre na pasta clonada:

cd controle_gastos_residenciais

## Criação e atualização do banco

Entre na pasta do backend:

```powershell
cd backend/ControlSpending
```

No arquivo `appsettings.json` edite as credencias para acesso ao banco de dados e inclua o seu user e o password senha



Restaure as dependências e aplique as migrations:

```powershell
dotnet restore
dotnet ef database update
```

## Execução do backend

Ainda em `backend/ControlSpending`, execute:

```powershell
dotnet run
```

Endereços configurados para desenvolvimento:

- API HTTPS: `https://localhost:7043`
- OpenAPI: `https://localhost:7043/openapi/v1.json`
- Swagger UI: `https://localhost:7043/swagger`


## Configuração e execução do frontend

 Instale as dependências e inicie a aplicação:

```powershell
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

## Endpoints principais

### Pessoas

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/Person` | Cadastra uma pessoa |
| `GET` | `/api/Person` | Lista as pessoas |
| `GET` | `/api/Person/{id}` | Consulta uma pessoa |
| `DELETE` | `/api/Person/{id}` | Exclui a pessoa e suas transações |

Exemplo de cadastro:

```json
{
  "name": "Maria Silva",
  "age": 25
}
```

### Transações

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/Transaction` | Cadastra uma transação |
| `GET` | `/api/Transaction/person/{personId}?page=1` | Lista uma página de transações da pessoa |

Exemplo de cadastro:

```json
{
  "description": "Conta de energia",
  "value": 180.50,
  "type": "Expense",
  "personId": 1
}
```

Os tipos aceitos são `Expense` para despesa e `Revenue` para receita.

### Totais

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/Summary/people` | Retorna os totais de cada pessoa |
| `GET` | `/api/Summary/overall` | Retorna os totais consolidados |

## Validação do projeto

### Backend

```powershell
cd backend/ControlSpending
dotnet build
dotnet format whitespace --verify-no-changes
```

### Frontend

```powershell
cd frontend
npm run lint
npm run build
```

## Decisões técnicas

- Valores financeiros utilizam `decimal` no backend para evitar erros de precisão de ponto flutuante.
- Datas de criação são registradas em UTC.
- Consultas somente de leitura utilizam `AsNoTracking()` que é uma funcionalidade do Entity Framework que permite que você consulte dados de um banco de dados sem rastrear as entidades resultantes.
- A regra para menores de idade é verificada no frontend para retorno imediato e no backend para garantir a integridade dos dados.

## Próximas implementações
- Substituir idade por data de nascimento e calcular a idade automaticamente.
- Implementar cadastro, login e logout.
- Adicionar autenticação e autorização.
- Permitir edição de pessoas.
- Permitir edição e exclusão de transações.
- Adicionar a data efetiva da transação.
- Implementar pesquisa e filtros de transações.
- Criar controle de orçamento mensal.
- Implementar tratamento global e padronizado de erros.
- Melhorar a validação e segurança das configurações da aplicação.