/**
 * @fileOverview
 *
 * Site search
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

      test.describe('Site search', function() {

        test.it('response to a valid search', function(done) {
          driver.get(process.env.DOMAIN + '/search');

          driver.wait(until.elementLocated({name: 'q'})).sendKeys('biscuit');

          driver.wait(until.elementLocated({xpath: '//main/div/div/form/div/button'})).click();

          driver.wait(until.elementLocated({xpath: '//main/div/div/p'})).getText().then(function(text){
            chai.expect(text).to.match(/About [1-9]\d* results/);
          });

          done();
        });


        test.it('response to a null search', function(done) {
          driver.get(process.env.DOMAIN + '/search');

          driver.wait(until.elementLocated({xpath: '//main/div/div/form/div/button'})).click();

          driver.wait(until.elementLocated({xpath: '//main/section/div/div/p'})).getText().then(function(text){
            chai.expect(text).to.equal('There are no results for your search.');
          });

          done();
        });

        if (browser.browserName != 'firefox') {
          test.it('response to special character search @wip', function (done) {
            driver.get(process.env.DOMAIN + '/search');

            driver.wait(until.elementLocated({ name: 'q' })).sendKeys('$');

            driver.wait(until.elementLocated({ xpath: '//main/div/div/form/div/button' })).click();

            driver.wait(until.elementLocated({xpath: '//main/section/div/div/p'})).getText().then(function(text){
              chai.expect(text).to.equal('There are no results for your search.');
            });

            done();
          });
        }

      });

    });

  })(i);
}
