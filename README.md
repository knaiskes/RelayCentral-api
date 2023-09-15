[![Node.js CI](https://github.com/knaiskes/RelayCentral-api/actions/workflows/test.yml/badge.svg)](https://github.com/knaiskes/RelayCentral-api/actions/workflows/test.yml)

# RelayCentral-api
A TypeScript API for managing IoT relay devices.
Each IoT relay device connects to the MQTT broker and then becomes available for receiving and sending commands to the broker

## Project Overview
The project starts the following containers:
- Node.js: for the TypeScript API
- Postgres: for the database
- Adminer: for the graphical management of the database
- MQTT: for MQTT communication

### Diagram

![diagram](https://github.com/knaiskes/RelayCentral-api/assets/6069054/62407af1-9b7e-46a9-b2de-b19675e0f895)

## Quick Start

### Clone this repository

```
$ git clone https://github.com/knaiskes/RelayCentral-api.git
```

### Configure enviroment variables

There is a file called .env_example as a starting point. Based on it, create a
new file called .env and change the variables based on your perferences.

```
$ cp .env_example .env
```

Generate TOKEN_SECRET and TOKEN_SECRET_REFRESH tokens with Node

```
$ node
> require('crypto').randomBytes(64).toString('hex'); // Run it twice and use the
result for your tokens variables
```

### Run project with docker-compose

```
$ cd RelayCentral-api/
$ docker-compose up --build
```

# API calls

The base URL is: [localhost:3001/api/v1](localhost:3001/api/v1)

## Relays endpoint

| Endpoint     | Description              | HTTP Method |
|--------------|--------------------------|-------------|
| /relays      | Get all the relays       | GET         |
| /relays/{id} | Get a single relay by id | GET         |
| /relays      | Post a new relay         | POST        |
| /relays/{id} | Patch a specific relay   | PATCH       |
| /relays/{id} | Delete a relay           | DELETE      |

# Request example
This example assumes that you already created a user.

## Generate  a token

```
$ curl -X POST -H 'Content-Type: application/json' -d '{"username": "user", "password": "password"}' localhost:3001/api/v1/get-token
```

## Make a request using the token

```
$ curl -H "Authorization:token" http://localhost:3001/api/v1/relays
```

## Refresh token

```
$ curl -X POST -H 'Content-Type: application/json' -d '{"refreshToken": "refresh-token"}' localhost:3001/api/v1/refresh-token
```
