import fs from 'fs';
// import path from 'path';
import { JSDOM } from 'jsdom';

function parseTestSuites(xmlContent: string): string {
  const xmlDoc = new JSDOM(xmlContent, { contentType: 'application/xml' }).window.document;
  const testSuiteNodes = xmlDoc.getElementsByTagName('testsuite');
  let htmlOutput = '';

  for (let i = 0; i < testSuiteNodes.length; i++) {
    const testSuiteNode = testSuiteNodes[i];
    const suiteName = testSuiteNode.getAttribute('name') || '';
    const suiteTime = parseFloat(testSuiteNode.getAttribute('time') || '0');
    const suiteTests = parseInt(testSuiteNode.getAttribute('tests') || '0', 10);
    const suiteFailures = parseInt(testSuiteNode.getAttribute('failures') || '0', 10);
    const testCases = testSuiteNode.getElementsByTagName('testcase');

    htmlOutput += `
      <div class="test-suite">
        <h2>${suiteName}</h2>
        <p>Time: ${suiteTime.toFixed(2)} seconds | Tests: ${suiteTests} | Failures: ${suiteFailures}</p>
        ${parseTestCases(testCases)}
      </div>
    `;
  }

  return htmlOutput;
}

function parseTestCases(testCases: HTMLCollectionOf<Element>): string {
  let htmlOutput = '';

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const caseName = testCase.getAttribute('name') || '';
    const caseTime = parseFloat(testCase.getAttribute('time') || '0');
    const caseClassname = testCase.getAttribute('classname') || '';
    const caseStatus = testCase.getElementsByTagName('failure').length > 0 ? 'failed' : 'passed';

    htmlOutput += `
      <div class="test-case ${caseStatus}">
        <p>${caseName} (${caseTime.toFixed(2)} seconds)</p>
      </div>
    `;
  }

  return htmlOutput;
}

export function generateHtmlReport(xmlFilePath: string, outputFilePath: string): void {
  const xmlContent = fs.readFileSync(xmlFilePath, 'utf-8');
  const htmlContent = `
    <html>
    <head>
      <title>Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; }
        .test-suite { margin-bottom: 20px; }
        .test-case { padding: 5px; }
        .test-case.passed { background-color: #d4edda; }
        .test-case.failed { background-color: #f8d7da; }
      </style>
    </head>
    <body>
      ${parseTestSuites(xmlContent)}
    </body>
    </html>
  `;
  fs.writeFileSync(outputFilePath, htmlContent);
}
