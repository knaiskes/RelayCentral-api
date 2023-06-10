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
