import { Before, After, Status, AfterAll } from '@cucumber/cucumber';
import { WebDriver } from 'selenium-webdriver';
import { ChromeDriver } from './chromeDriver';
import { FirefoxDriver } from './firefoxDriver';
import { SafariDriver } from './safariDriver';
import { updateCucumberReport } from './reportUpdater';
const fs = require('fs');
const path = require('path');

const browserName = process.env.BROWSER || 'chrome';
let driver: WebDriver;
Before(async function () {
  switch (browserName.toLowerCase()) {
    case 'firefox':
      driver = FirefoxDriver();
      break;
    case 'safari':
      driver = SafariDriver();
      break;
    case 'chrome':
    default:
      driver = ChromeDriver();
  }

  this.driver = driver;
});

After(async function (scenario) {
  if (this.driver) {
    try {
      if (scenario.result && scenario.result.status === Status.FAILED) {
        const screenShot = await this.driver.takeScreenshot();
        this.attach(screenShot, 'image/png');
      }

      const results = extractTestResults(scenario);

      const reportPath = path.resolve(__dirname, 'reports/cucumber_report.json');
      updateCucumberReport(results, reportPath);

    } catch (error) {
      console.error('Error in After hook:', error instanceof Error ? error.message : error);
    } finally {
      await this.driver.quit();
    }
  }
});

AfterAll(function () {
  const reporter = require('cucumber-html-reporter');
  const reportPath = path.resolve(__dirname, 'reports/cucumber_report.json');
  const reportOutput = path.resolve(__dirname, 'reports/cucumber_report.html');

  try {
    if (!fs.existsSync(reportPath)) {
      throw new Error(`Report file not found: ${reportPath}`);
    }

    const rawData = fs.readFileSync(reportPath, 'utf-8');
    const reportData = JSON.parse(rawData);

    // Validate JSON structure
    if (!Array.isArray(reportData) || reportData.length === 0) {
      throw new Error(`Invalid report data: ${JSON.stringify(reportData, null, 2)}`);
    }

    const options = {
      theme: 'bootstrap',
      jsonFile: reportPath,
      output: reportOutput,
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: true,
      metadata: {
        "App Version": "0.3.2",
        "Test Environment": "LIVE",
        "Browser": browserName,
        "Parallel": "Scenarios",
        "Executed": "Remote"
      },
      failedSummaryReport: true,
    };

    reporter.generate(options);
  } catch (error) {
  }
});

function extractTestResults(scenario: any) {
  if (!scenario.pickle || !Array.isArray(scenario.pickle.steps)) {
    console.error('Invalid scenario format:', scenario);
    return [];
  }
  const results = scenario.pickle.steps.map((step: any) => {
    const location = step.locations ? step.locations[0] : {};
    const line = location ? location.line : 0;
    const result = scenario.result ? scenario.result : {};
    return {
      description: scenario.pickle.name,
      elements: [{
        description: '',
        id: `${scenario.pickle.name};${step.text}`,
        keyword: step.keyword,
        line: line,
        name: step.text,
        steps: [{
          arguments: [],
          keyword: step.keyword,
          line: line,
          name: step.text,
          result: {
            status: result.status,
            duration: result.duration,
            error_message: result.exception ? result.exception.message : 'No error message'
          }
        }],
        tags: [],
        type: 'scenario'
      }]
    };
  });

  return results;
}
