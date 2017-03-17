# Automated Web Test

Automated web testing using [Selenium](http://www.seleniumhq.org/), [Mocha](https://mochajs.org/) and [SauceLabs](https://saucelabs.com/)

## Prerequisities

[Docker for Mac](https://download.docker.com/mac/stable/Docker.dmg) or [Docker for Windows](https://download.docker.com/win/stable/InstallDocker.msi)

## Necessary tweaks

To run either the full or integration test suites update the following section

Within either both or one of the `docker-compose-all.yaml` and `docker-compose-integration.yaml` files

```
environment:
      URL: 'http://www.example.com'
      SAUCE_USERNAME: 'unknown'
      SAUCE_ACCESS_KEY: 'unknown'
```

## Usage

Now run either:

- `docker-compose -f docker-compose-all.yaml up`
- `docker-compose -f docker-compose-integration.yaml up`