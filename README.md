# Automated Web Test
Automated web testing using [Selenium][selenium], [Mocha][mochjs], [Chai][chaijs] and [SauceLabs][saucelabs].

> **NOTE:** This is currently in active development and will change at short notice. It is not production ready.

## Requirements
This app requires the following:

[Docker][docker] 17.0.0 and above

## Getting Started
Clone the repository:

```bash
git clone https://github.com/ukparliament/parliament.uk-awt.git
cd parliament.uk-awt
```

## Running the application
Running the application locally is done using docker, this will build an image and container.

### Build image
```bash
docker build -t parliamentukawt_node .
```

### Build container
```bash
docker run -d -it --rm --name parliamentukawt_app -v $(PWD):/app -v /app/node_modules -v /screenshot parliamentukawt_node
```

### Enter the containers shell
```bash
docker exec -it parliamentukawt_app /bin/sh
```

### Application commands available within the container
| Command  | Description  |
|---|---|
| `make test`  | Run all test  |
| `make asset`  | Download all test screenshot from Saucelabs to a 'screenshot' directory  |
| `make clean`  | Remove all Saucelabs jobs, linked assets and local screenshot directory  |

## Contributing
If you wish to submit a bug fix or feature, you can create a pull request and it will be merged pending a code review.

1. Fork the repository
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create a new Pull Request

[docker]:          		  https://www.docker.com/
[selenium]:          		http://docs.seleniumhq.org
[sel-doc]:              https://seleniumhq.github.io/selenium/docs/api/javascript/index.html
[mochjs]:          		  http://mochajs.org
[chaijs]:          		  http://chaijs.com
[saucelabs]:          	https://saucelabs.com
[node]:          		    https://nodejs.org/en
[npm]:                  https://www.npmjs.com
