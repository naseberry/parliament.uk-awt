# Automated Web Test

Automated web testing using [Selenium][selenium], [Mocha][mochjs] and [SauceLabs][saucelabs].

## Prerequisities

[Docker for Mac](https://download.docker.com/mac/stable/Docker.dmg) or [Docker for Windows](https://download.docker.com/win/stable/InstallDocker.msi)

## Usage

To run either the full or integration test suites update the following section

Within either both or one of the `docker-compose-all.yaml` and `docker-compose-integration.yaml` files

```
environment:
      URL: 'http://beta.parliament.uk'
      SAUCE_USERNAME: 'unknown'
      SAUCE_ACCESS_KEY: 'unknown'
```

Now run either `docker-compose -f docker-compose-all.yaml up` or `docker-compose -f docker-compose-integration.yaml up`