# Selenium-Cucumber-Node.js
# Prerequisites
Install the following:
Node.js and npm (version)
Selenium and cucumber

# Setup:
1. Import the project from github using the following approaches:
    a. Using terminal - git clone https://github.com/RAGHURAMT/Selenium-Cucumber-Node.js.git
    b. Using vs code - Open command palette -> Search for git: Clone -> enter the git url https://github.com/RAGHURAMT/Selenium-Cucumber-Node.js.git

2. Open Terminal in project location and run the following commands:
    1. npm install

3. To run the tests:
    <!-- To run the tests on chrome browser -->
    npm run test:chrome
    <!-- To run the tests on firefox browser -->
    npm run test:firefox
    <!-- To run the tests on safari browser -->
    npm run test:safari

# Folder Structure
Selenium-Cucumber-Node.js/
│
├── .githib/
│   ├── workflows/
│         └── ci.yml
├── e2e/
│   |── features/
|           └── homepage.feature
|   |── config/
|           └── config.ts
|   |── pageObjects/
|           └── homepage.ts
|   |── runtime/
|           └── reports
|           |     └── cucumber_report.html
|           |     └── cucumber_report.json
|           └── chromeDriver.ts
|           └── firefoxDriver.ts
|           └── generateReports.ts
|           └── hooks.ts
|           └── reportUpdater.ts
|           └── safariDriver.ts
|   |── step-definitions/
|           └── homepageSteps.ts
├── node_modules/
├── cucumber.js
├── package.json
├── package-lock.json
├── tsconfig.json
└── ... other files

# Test Files
homepage.feature: Test scenarios related to the Homepage steps provided to automate

# Reports and Artifacts
Cucumber reports

# github actions
Created ci.yml under .github/workflows to automatically trigger the tests on every push. We can check the runs under github Actions tab.

# Slack integration
Integrated with the Slack to share the test reports on a Slack channel on every run.
Note: 
1. Please note that tests will fail on the github actions tab if you miss to add your Slack webhook under Settings -> Security -> Actions
2. If you dont like to do the slack integration, please comment the Slack Notification block in ci.yml
