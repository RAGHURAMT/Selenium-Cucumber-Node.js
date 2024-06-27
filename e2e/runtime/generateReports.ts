const fs = require('fs');
const path = require('path');
const reporter = require('cucumber-html-reporter');

const reportPath = path.resolve(__dirname, 'reports/cucumber_report.json');
const reportOutput = path.resolve(__dirname, 'reports/cucumber_report.html');

try {
  if (!fs.existsSync(reportPath)) {
    throw new Error(`Report file not found: ${reportPath}`);
  }

  const rawData = fs.readFileSync(reportPath, 'utf-8');
  const reportData = JSON.parse(rawData);

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
      "Parallel": "Scenarios",
      "Executed": "Remote"
    },
    failedSummaryReport: true,
  };

  reporter.generate(options);
} catch (error) {
  console.error('Error generating HTML report:', error instanceof Error ? error.message : error);
}
