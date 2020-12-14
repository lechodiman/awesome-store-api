# Awesome store backend

This is the backend for the `awesome-store-app` application.

## Uses

- Express
- MongoDB
- Typescript
- Zod for input validation
- Multer for file input management

## Installation

Clone this repository, then add a `development.env` inside the `env` directory with the following:

```env
NODE_ENV=development
MONGO_CONNECTION_STR=mongodb://localhost:27017/<your-db-name>
PORT=4200
CLOUDINARY_URL=
```

You must add your personal database name in `<your-db-name>` and your cloudinary URL to handle image uploads.

```
yarn install
```

## Runnning

Once the dependencies are installed and the environment variables are set, you can run the API.

To run in dev mode, run the following in your terminal:

```
yarn run dev
```

This will watch the `src` directory for changes and will recompile and run the API each time.

## Error handling

Error handling was managed using Zod for input validation and `serialize-error` to create a response that can be handled by a client.

## TODO

- [ ] Integration tests with Jest
- [ ] Error handling for Server Error and NotFound
