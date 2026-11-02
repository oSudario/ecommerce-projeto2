# E-commerce — Projeto 2

Continuação do código inicial do professor, usando InversifyJS 7 para montar as dependências.

## Como rodar

Com Node.js 20 ou superior, abra o terminal na pasta do projeto:

```bash
npm install
```

Copie `.env.example` para `.env`. No Windows, pode duplicar o arquivo pelo explorador e renomear. No Linux, use `cp .env.example .env`.

Depois rode:

```bash
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

O servidor fica em http://localhost:3000. Para conferir os tipos, execute `npm run check`.

### Modo dev

No `.env`, deixe `APP_ENV=dev`. Os produtos e pedidos usam o SQLite pelo Prisma. O e-mail usa o Ethereal, então é necessário ter internet. A resposta do pedido traz um link para visualizar o e-mail de teste; não é um envio real para a caixa do cliente.

### Modo test

Mude apenas para `APP_ENV=test` no `.env` e reinicie o servidor. Os pedidos ficam em um array e o e-mail aparece no terminal. Ao reiniciar, os pedidos são perdidos e a numeração começa novamente.

Os produtos continuam no SQLite local nos dois modos. Por isso a migração e o seed também são necessários no modo test. Depois de instalar e preparar o banco, esse modo não precisa de internet.

### Fazer um pedido

No Postman, envie um POST para `http://localhost:3000/orders`, selecione Body → raw → JSON e use:

```json
{
  "customer": "cliente@exemplo.com",
  "items": [{ "productId": 1, "quantity": 1 }],
  "paymentMethod": "pix",
  "paymentDetails": {}
}
```

O produto 1 custa R$ 100 e tem R$ 10 de frete: total R$ 110. O produto 2 custa R$ 50 e não tem frete. Com uma unidade de cada, o total é R$ 160.

Também estão disponíveis `credit_card` (cardNumber e cvv em paymentDetails) e `debit_card` (cardNumber). Os pagamentos são simulações do código inicial.

## Alterações

Os identificadores estão em `src/container/types.ts`. O `container.ts` registra as classes e escolhe os repositórios e o provider conforme o APP_ENV. O `app.ts` busca o controller no container e registra a rota.

As dependências dos construtores usam `@inject`. As três formas de pagamento usam o mesmo identificador e são recebidas pelo registro com `@multiInject`. Os repositórios e o provider de e-mail são singleton.

Foram adicionados `ConsoleMailProvider` e `InMemoryOrderRepository`. A regra de cálculo do pedido foi mantida.
