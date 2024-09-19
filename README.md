# Delta Green assignment

This is a hiring assignment for Delta Green. The assignment is to create a simple web application that allows users to
create, read, update, and delete notes.

## Running the application (with Docker)

Set up the environment variables in the `.env` file. You can use the `.env.example` file as a template.
Fill the environment variables as guided in the `.env.example` file.

Then run the following commands:

```bash
docker-compose build
docker-compose up
```

The application will be running on `http://localhost:3000`.

You might have to run the following command to run the migrations:

```bash
pnpm run db:migrate
```

## Running the application (without Docker, only postgres)

You have to have node-v20 installed on your machine. You can install dependencies by running the following command:

```bash
pnpm install
docker compose up -d postgres
pnpm run db:migrate
```

Then you can run the following command to start the application:

```bash
pnpm run dev
```

Or production mode:

```bash
pnpm run build
pnpm start
```

Application should be running on `http://localhost:3000`.