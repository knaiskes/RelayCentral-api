[![Node.js CI](https://github.com/knaiskes/RelayCentral-api/actions/workflows/test.yml/badge.svg)](https://github.com/knaiskes/RelayCentral-api/actions/workflows/test.yml)

# RelayCentral-api

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
