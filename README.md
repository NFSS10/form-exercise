# Form exercise

https://github.com/NFSS10/form-exercise/assets/22588915/83135e6a-15ad-4f5e-a93d-a41341142dda

## Table of Contents

- [How to run](#how-to-run)
- [Populate database](populate-database)
- [Quick API test](#quick-api-test)


## How to run

1. Spin up the database

Run docker compose on the root directory, it will setup a MongoDB database and a mongo-express application.

> Optionally you can just change the `MONGODB_URI` in the `.env` file of the `backend/` point to your own MongoDB instance.

```bash
docker compose up
```

2. Install and run the backend

2.1. Move inside the `backend` directory


```bash
cd ./backend
```

2.2. Create `.env` file

```bash
cp .env.template .env
```

> **:information_source: NOTE:** Please change the `MONGODB_URI` in the `.env` file to the running MongoDB instance.

2.2. Install dependencies

```bash
yarn install
```

2.3. Build the service

```bash
yarn build
```

2.4. Run the service

```bash
yarn start
```

3. Install and run the frontend

3.1. Move inside the `frontend` directory

```bash
cd ./frontend
```

3.2. Install dependencies

```bash
yarn install
```

3.3. Run the service

```bash
yarn preview
```

## Populate database

I created a script to populate the database with some data, you can run it with the following command on the root directory:

```bash
node ./populate.js
```

> **:information_source: NOTE:** You should change the `url` variable inside the script if the server is not running on `http://localhost:5000`

## Quick API test

I also created a script to test the API, you can run it with the following command on the root directory:

```bash
node ./test.js
```

> **:information_source: NOTE:** You should change the `url` variable inside the script if the server is not running on `http://localhost:5000`
