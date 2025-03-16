### Steps to create a Backend project [Node/Typescript]

- First, create the project:

        npm init -y

- Second, install dependencies:
  only the necessary ones

          initial:
          - express
          - prisma
          - @prisma/client
          - bcrypt
          - nodemon

          development tools:
          - typescript
          - ts-node-dev
          - @types/node
          - @types/express
          - dotenv

- Third, configure typescript:

        npx tsc --init

- Fourth, edit `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

- Five, configure the `prisma`:

        npx prisma init

- Six, after modeling the database, you need to upload a migrate:

        npx prisma migrate dev --name init
