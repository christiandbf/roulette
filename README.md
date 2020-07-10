# Roulette

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=christiandbf_roulette)](https://sonarcloud.io/dashboard?id=christiandbf_roulette)

Roulette Rest API built using TypeScript and Redis.

## Build the Docker image

To build the Docker image, use the `docker build` command:

```shell
docker build . -t roulette:latest
```

To stop the build on a specific stage, use the `target` option:

```shell
docker build --target builder -t roulette:latest .
```

## Run

For **development**, use the `docker-compose up -d` command:

```shell
docker-compose up -d
```

## API Endpoints

### General information

- All endpoints return either a JSON object or array.
- For POST and PUT endpoints, the content to save is specified in the body request with Content-Type x-www-form-urlencoded or application/json.

### Create roulette

```plain
POST /roulettes
```

You can use the following mime types in your Content-Type header and provide the data in the body:

- x-www-form-urlencoded (key par value).
- application/json (json).

#### Parameters

| Parameter | Type            | Mandatory | Description          |
| --------- | --------------- | --------- | -------------------- |
| Values    | Key-par or JSON | Yes       | Values to save in DB |

The schema is defined as follow. **All the properties are required**.

```plain
name: String
```

#### Response

```plain
{
  "id": "307770a0-a542-11ea-bf59-d599c4ac862e",
  "isOpen": false,
  "name": "Sala1"
}
```

### Open roulette

```plain
PUT /roulettes/open/:id
```

#### Response

```plain
{
  "id": "307770a0-a542-11ea-bf59-d599c4ac862e",
  "isOpen": false,
  "name": "Sala1"
}
```

### Close roulette

```plain
PUT /roulettes/close/:id
```

#### Response

```plain
{
  "result": "RED",
  "betWinners": ["20ed3270-a603-11ea-a08a-315bb84a695d"],
  "betLlossers": []
}
```

### List roulette

```plain
GET /roulettes
```

### Create bet

```plain
POST /bets
```

You can use the following mime types in your Content-Type header and provide the data in the body:

- x-www-form-urlencoded (key par value).
- application/json (json).

#### Parameters

| Parameter | Type            | Mandatory | Description          |
| --------- | --------------- | --------- | -------------------- |
| Values    | Key-par or JSON | Yes       | Values to save in DB |
| USER      | HEADER          | Yes       | User UUID            |

The schema is defined as follow. **All the properties are required**.

```plain
selection: String
rouletteId: String (UUID)
amount: Number
```

#### Response

```plain
{
  "id": "dc664320-a608-11ea-aace-d1ab6ba55deb",
  "rouletteId": "20ed3270-a603-11ea-a08a-315bb84a695d",
  "amount": 1000,
  "selection": "BLACK",
  "userId": "20ed3270-a603-11ea-a08a-315bb84a695d"
}
```
