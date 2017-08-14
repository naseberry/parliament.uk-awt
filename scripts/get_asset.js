/**
 * @fileOverview
 *
 * Download job assets
 *
 * https://wiki.saucelabs.com/display/DOCS/Job+Methods#JobMethods-GetJobAssetFiles
 * https://www.npmjs.com/package/saucelabs
 */

'use strict';

const fs = require('fs'),
  screenshot = process.cwd() + '/screenshot/',
  SauceLabs = require('saucelabs'),
  username = process.env.SAUCE_USERNAME,
  accessKey = process.env.SAUCE_ACCESS_KEY,
  saucelabs = new SauceLabs({
    username: username,
    password: accessKey,
  });


saucelabs.getJobs(function (err, jobs) {
  for (let i = 0; i < jobs.length; i++) {
    let assetDir = screenshot + jobs[i].id + '--' + jobs[i].name;
    if (!fs.existsSync(assetDir)) {
      fs.mkdirSync(assetDir);
    }
    saucelabs.showJobAssets(jobs[i].id, function (err, res) {
      for (let s = 0; s < res.screenshots.length; s++) {
        writeSh('cd ' + assetDir + ' && { curl -u ' + username + ':' + accessKey + ' -O https://saucelabs.com/rest/v1/' + username + '/jobs/' + jobs[i].id + '/assets/' + res.screenshots[s] + '; cd -; } \n');
      }
    });
  }
});


function writeSh(data) {
  fs.appendFile('asset.sh', data, function (err) {
    if (err) {
      console.log(err.message);
    }
    console.log('success!');
  });
}
