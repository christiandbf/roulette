# Roulette

Roulette API Rest built using TypeScript and Redis.

## Build the Docker image

To build the Docker image, use the `docker build` command:

```shell
docker build . -t roulette:latest --build-arg NODE_ENV=development
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
