## Minhas Finanças

Essa é uma aplicação criada para gerenciar minha finanças pessoais. A idéia é ser capaz de processar extratos gerados por bancos e instituições de pagamento Brasileiras, como Nubank e Itau.

![](https://user-images.githubusercontent.com/68507/177015943-7e523db3-3b47-44d9-bfbc-fda8bd88dc1d.png)

## Rodando o servidor

A aplicação é basicamente um servidor NextJS com algumas APIs que usam o Prisma para fazer consultas de banco de dados.

Para rodar o servidor, basta seguir as instruções de qualquer aplicação NextJS.

```bash
npm run dev
# or
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver os resultado.

## Saiba mais

Para saber mais sobre os componentes utilizados nessaa aplicação, consulte suas páginas oficiais

- [Next.js](https://nextjs.org/docs).
- [Prisma](https://www.prisma.io/).

## Deploy na Vercel

A forma mais rápida de subir essa aplicação é através da [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) feita pelos criadores do NextJS.

Para resolver a parte de Banco de dados, recomendamos que você utilize uma solução na núvem de Banco de dados como o **RDS da Amazon** ou o **Google Cloud**.