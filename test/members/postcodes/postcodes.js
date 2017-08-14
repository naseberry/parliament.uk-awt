/**
 * @fileOverview
 *
 * Postcode search
 */

'use strict';

let test = require('selenium-webdriver/testing'),
  {Builder, By, until} = require('selenium-webdriver'),
  chai = require('chai'),
  SauceLabs = require('saucelabs'),
  username = process.env.SAUCE_USERNAME,
  accessKey = process.env.SAUCE_ACCESS_KEY,
  saucelabs = new SauceLabs({
    username: username,
    password: accessKey,
  }),
  ukp_browser = require(process.cwd() + '/config/browser.json'),
  driver;

for (let i = 0; i < ukp_browser.capabilities.length; i++) {
  (function() {

    let browser = ukp_browser.capabilities[i];

    test.describe('Browser Test: ' + browser.name, function() {

      this.timeout(60000);

      test.beforeEach(function(done) {
        driver = new Builder()
          .withCapabilities({
            'name': browser.name,
            'browserName': browser.browserName,
            'version': browser.version,
            'platform': browser.platform,
            'username': username,
            'accessKey': accessKey,
            'public': 'private'
          })
          .usingServer('http://' + username + ':' + accessKey + '@ondemand.saucelabs.com:80/wd/hub')
          .build();

        driver.getSession().then(function(sessionid) {
          driver.sessionID = sessionid.id_;
        });

        done();
      });

      test.afterEach(function(done) {
        const passed = (this.currentTest.state === 'passed') ? true : false;

        driver.quit();

        saucelabs.updateJob(driver.sessionID, {
          passed: passed
        });

        done();
      });

      test.describe('Postcode search', function() {

        test.it('response to a valid postcode', function(done) {
          driver.get(process.env.DOMAIN + '/postcodes');

          driver.wait(until.elementLocated({name: 'postcode'})).sendKeys('SW1A 0AA');

          driver.wait(until.elementLocated({xpath: '//main/div/div/form/div/button'})).click();

          driver.wait(until.elementLocated({xpath: '//main/div/div/div/h2'})).getText().then(function(text){
            chai.expect(text).to.equal('Cities of London and Westminster');
          });

          done();
        });


        test.it('response to a null postcode', function(done) {
          driver.get(process.env.DOMAIN + '/postcodes');

          driver.wait(until.elementLocated({xpath: '//main/div/div/form/div/button'})).click();

          driver.wait(until.elementLocated({xpath: '//main/div/div/div/p'})).getText().then(function(text){
            chai.expect(text).to.equal('We couldn\'t find the postcode you entered.');
          });

          done();
        });


        if (browser.browserName != 'firefox') {
          test.it('response to special character search @wip', function(done) {
            driver.get(process.env.DOMAIN + '/postcodes');

            driver.wait(until.elementLocated({name: 'postcode'})).sendKeys('$');

            driver.wait(until.elementLocated({xpath: '//main/div/div/form/div/button'})).click();

            driver.wait(until.elementLocated({name: 'postcode'})).getAttribute('validationMessage').then(function(text) {
              // each browser has a different validation message
              chai.expect(text).to.match(/Please match the requested format.|You must use this format|pattern mismatch/);
            });

            done();
          });
        }

      });

    });

  })(i);
}
