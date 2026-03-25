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
- `npm run preview`: abre a versao de preview
- `npm run deploy:firebase`: publica no Firebase Hosting

## Variaveis de ambiente

Crie um arquivo `.env` com:

```env
VITE_SUPABASE_URL=https://ouqkvintvgszviyvgrdn.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Como rodar

1. Instale as dependencias com `npm install`
2. Copie `.env.example` para `.env`
3. Preencha as chaves do Supabase
4. Rode `npm run dev`

## Deploy no Firebase Hosting

1. Instale a CLI com `npm install -g firebase-tools`
2. Rode `firebase login`
3. Copie `.firebaserc.example` para `.firebaserc`
4. Troque `seu-projeto-firebase` pelo id do seu projeto Firebase
5. Rode `npm run build`
6. Rode `npm run deploy:firebase`

O arquivo [firebase.json](/C:/Users/mbrum/OneDrive/Desktop/faculdade/Project_Implantacao/firebase.json) ja esta configurado com rewrite para SPA, entao as rotas do React funcionam no Hosting.
