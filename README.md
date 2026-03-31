# Build Library

Aplicacao front-end em React para gerenciar builds de personagens, com autenticacao e CRUD integrados ao Supabase.

## Stack

- React
- TypeScript
- Vite
- React Router
- Supabase

## Scripts

- `npm run dev`: inicia o ambiente local
- `npm run build`: gera o build de producao
- `npm run build:dev`: gera o build usando `.env.development`
- `npm run build:prod`: gera o build usando `.env.production`
- `npm run preview`: abre a versao de preview
- `npm run deploy:dev`: publica o ambiente de desenvolvimento no Firebase Hosting
- `npm run deploy:prod`: publica o ambiente de producao no Firebase Hosting
- `npm run deploy:firebase`: alias para deploy de producao

## Variaveis de ambiente

Crie um arquivo `.env.development` para dev e `.env.production` para producao com:

```env
VITE_SUPABASE_URL=https://ouqkvintvgszviyvgrdn.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Se quiser, os dois ambientes podem apontar para projetos diferentes do Supabase.

## Como rodar

1. Instale as dependencias com `npm install`
2. Copie `.env.development.example` para `.env.development`
3. Copie `.env.production.example` para `.env.production`
4. Preencha as chaves do Supabase em cada arquivo
5. Rode `npm run dev`

O Vite usa `.env.development` no `npm run dev` e no `npm run build:dev`, e usa `.env.production` no `npm run build:prod`.

## Deploy no Firebase Hosting

1. Instale a CLI com `npm install -g firebase-tools`
2. Rode `firebase login`
3. Copie `.firebaserc.example` para `.firebaserc`
4. Troque `seu-projeto-firebase`, `seu-site-producao` e `seu-site-desenvolvimento` pelos ids reais do Firebase
5. Crie os dois sites de Hosting se ainda nao existirem
6. Rode `npm run deploy:dev` para publicar o ambiente dev
7. Rode `npm run deploy:prod` para publicar o ambiente prod

O arquivo [firebase.json](/C:/Users/mbrum/OneDrive/Desktop/faculdade/Project_Implantacao/firebase.json) ja esta configurado com dois targets de Hosting e rewrite para SPA, entao as rotas do React funcionam nos dois ambientes.
