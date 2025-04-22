# Watchit‑API 🎬

Backend in **TypeScript + GraphQL + Firebase** where all **social primitives are implemented off‑chain** (profiles, posts, comments, likes, etc.).

---

## Stack

| Layer      | Tech                                                   |
|------------|--------------------------------------------------------|
| Gateway    | **Apollo Server 4** (GraphQL)                         |
| Mutations  | **Firebase Cloud Functions v2** (callable + triggers)  |
| Storage    | **Firestore** (Admin SDK)                              |

---

## Folder layout

```
src/
├─ externals/   # Firebase + other SDK wrappers
├─ datasources/ # Read‑only data access (Firestore)
├─ services/    # business orchestration (calls CF)
├─ graphql/     # SDL (Schema Definition Language) + resolvers
└─ functions/   # Cloud Functions source

firebase.json
.firebaserc
```

---

## Quick start (local)

```bash
npm i && npm run generate           # install root deps + generate GraphQL types
cd src/functions && npm i           # install Cloud Functions deps
npm --prefix src/functions run emulate   # start functions + firestore emulators
npm run dev                         # start GraphQL API → http://localhost:4000/graphql
```

---

## Sample operations

```graphql
mutation {
  createUser(input: { username: "alice", address: "0xAlice" }) {
    address
    username
  }
}

mutation {
  updateUser(input: { address: "0xAlice", bio: "hello" }) {
    bio
  }
}

query {
  user(address: "0xAlice") {
    username
    bio
  }
}
```

---

## Scripts

| Root command           | Action                     |
|------------------------|----------------------------|
| `npm run dev`          | watch GraphQL API          |
| `npm run generate`     | graphql-codegen            |
| `npm run compile`      | build API to `dist/`       |

| `src/functions` command | Action                  |
|-------------------------|-------------------------|
| `npm run build`         | compile Cloud Functions |
| `npm run emulate`       | start local emulators   |

---

## Deploy

```bash
cd src/functions && run build          # compile functions
npx firebase deploy --only functions   # deploy functions
npm run compile && node dist/index.js  # run GraphQL API
```

