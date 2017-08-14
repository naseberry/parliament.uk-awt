.PHONY: test itest clean asset

# Environment variables
DOMAIN?=unknown
SAUCE_USERNAME?=unknown
SAUCE_ACCESS_KEY?=unknown

# Node modules
ESLINT=./node_modules/.bin/eslint
MOCHA=./node_modules/.bin/mocha
MOCHA_PARALLEL=./node_modules/.bin/mocha-parallel-tests

# Common variables
SCREENSHOT_LOC=screenshot
SCRIPTS_LOC=scripts
TEST_LOC=test


# Concurrent test
test:
	@env DOMAIN=$(DOMAIN) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA_PARALLEL) --no-timeouts --recursive $(TEST_LOC)/


# Incremental test
itest:
	@env DOMAIN=$(DOMAIN) SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) $(MOCHA) --no-timeouts --recursive $(TEST_LOC)/


# Runs tests on javascript files
lint:
	@$(ESLINT) $(SCRIPTS_LOC) $(TEST_LOC)


# removes all SauceLabs jobs and linked assets
# removes all local screenshots
clean:
	@env SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) node $(SCRIPTS_LOC)/delete_job.js
	@rm -rf $(SCREENSHOT_LOC)/


# Download all assets
asset:
	@mkdir -p $(SCREENSHOT_LOC)
	@env SAUCE_USERNAME=$(SAUCE_USERNAME) SAUCE_ACCESS_KEY=$(SAUCE_ACCESS_KEY) node $(SCRIPTS_LOC)/get_asset.js
	@chmod u+x asset.sh && ./asset.sh
	@rm asset.sh
