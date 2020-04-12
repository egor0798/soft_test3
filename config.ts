import { Config, browser } from "protractor";
import { SpecReporter } from "jasmine-spec-reporter";

export let config: Config = {
    directConnect: true,
    onPrepare: async () => {
        // configureReports();
        browser.ignoreSynchronization = true;
      },
    onComplete: function() {
        // jasmineOnComplite();
    },
    SELENIUM_PROMISE_MANAGER: false,
    specs: [
        "src/suites/**/*.spec.js"
    ],
    // restartBrowserBetweenTests: true,
    capabilities: {
        browserName : 'firefox',
        platform: 'ANY'
    },
    jasmineNodeOpts: { defaultTimeoutInterval: 260000 },
    allScriptsTimeout: 110000,
    getPageTimeout: 110000,
};

const configureReports = () => {
    jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
            displayDuration: true,
            displayErrorMessages: true,
            displayStacktrace: true,
            displayFailed: true,
            displaySuccessful: true,
            displayPending: true
        },
        colors: {
            successful: 'green',
            failed: 'red',
            pending: 'yellow'
        },
        prefixes: {
            successful: '✓ ',
            failed: '✗ ',
            pending: '* '
        },
        customProcessors: []
    }));
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
       consolidateAll: true,
       filePrefix: 'base-report',
       savePath: '.'
    }));
    // const fs = require('fs-extra');
    // fs.emptyDir('screenshots/', function (err) {
    //          console.log(err);
    //      });
    //      // jasmine.getEnv().addReporter({
    //      //     specDone: async (result) => {
    //      //         const tempScreenShotPath = 'screenshots/temp.png';
    //      //
    //      //         if (result.status == 'failed') {
    //      //           fs.rename('screenshots/temp.png', 'screenshots/chrome-' + result.fullName+ '.png');
    //      //         } else {
    //      //             fs.unlinkSync(tempScreenShotPath);
    //      //         }
    //      //     }
    //      // });
};

const jasmineOnComplite = () => {
    let browserName, browserVersion;
    let capsPromise = browser.getCapabilities();
    capsPromise.then(function (caps) {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version');
        let platform = caps.get('platform');
        let HTMLReport = require('protractor-html-reporter-2');
        let testConfig = {
            reportTitle: 'Protractor Test Execution Report',
            outputPath: './',
            outputFilename: 'Autotests Report',
            screenshotPath: './screenshots',
            testBrowser: browserName,
            browserVersion: browserVersion,
            modifiedSuiteName: false,
            screenshotsOnlyOnFailure: true,
            testPlatform: platform
        };
        new HTMLReport().from('base-report.xml', testConfig);
    })
};
