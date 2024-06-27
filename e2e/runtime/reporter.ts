import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

// Function to fix malformed XML by adding spaces between attributes
function fixMalformedXML(xml: string): string {
  return xml.replace(/([a-zA-Z0-9]+)(=)/g, '$1 $2');
}

// Function to check if XML is well-formed
function isWellFormedXML(xml: string): boolean {
  const parser = new JSDOM(xml, { contentType: 'text/xml' });
  const doc = parser.window.document;

  if (doc.querySelector('parsererror')) {
    console.error('Error: Malformed XML detected.');
    return false;
  }
  return true;
}

// Function to generate HTML report
async function generateHTMLReport() {
  const xmlFilePath = path.join(__dirname, '../reports/cucumber_report.xml');
  const htmlFilePath = path.join(__dirname, '../reports/cucumber_report.html');

  // Read the XML file
  let xmlData;
  try {
    xmlData = fs.readFileSync(xmlFilePath, 'utf8');
  } catch (err) {
    console.error('Error reading the XML file:', err);
    return;
  }

  xmlData = xmlData.trim();

  // Fix malformed XML by adding spaces between attributes
  xmlData = fixMalformedXML(xmlData);

  // Check if the XML is well-formed
  if (!isWellFormedXML(xmlData)) {
    console.error('Error: The XML file is not well-formed.');
    return;
  }

  let dom;
  try {
    dom = new JSDOM(xmlData, { contentType: 'text/xml' });
  } catch (err) {
    console.error('Error parsing XML:', err);
    return;
  }

  const testSuites = dom.window.document.querySelectorAll('testsuite');

  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; }
        .suite { margin-bottom: 20px; }
        .suite-header { font-size: 20px; font-weight: bold; }
        .case { margin-left: 20px; }
        .case.pass { color: green; }
        .case.fail { color: red; }
      </style>
    </head>
    <body>
  `;

  testSuites.forEach(suite => {
    const suiteName = suite.getAttribute('name');
    const suiteTime = parseFloat(suite.getAttribute('time') || '0');
    const suiteTests = parseInt(suite.getAttribute('tests') || '0', 10);
    const suiteFailures = parseInt(suite.getAttribute('failures') || '0', 10);
    const suiteErrors = parseInt(suite.getAttribute('errors') || '0', 10);

    htmlContent += `
      <div class="suite">
        <div class="suite-header">${suiteName} - ${suiteTime}s (Tests: ${suiteTests}, Failures: ${suiteFailures}, Errors: ${suiteErrors})</div>
    `;

    const testCases = suite.querySelectorAll('testcase');
    testCases.forEach(testCase => {
      const caseName = testCase.getAttribute('name');
      const caseTime = parseFloat(testCase.getAttribute('time') || '0');
      const failureNode = testCase.querySelector('failure');
      const caseStatus = failureNode ? 'fail' : 'pass';

      htmlContent += `
        <div class="case ${caseStatus}">${caseName} - ${caseTime}s</div>
      `;
    });

    htmlContent += `</div>`;
  });

  htmlContent += `
    </body>
    </html>
  `;

  // Write the HTML report to a file
  try {
    fs.writeFileSync(htmlFilePath, htmlContent);
    console.log('HTML report generated successfully!');
  } catch (err) {
    console.error('Error writing the HTML report:', err);
  }
}

// Run the report generation function
generateHTMLReport().catch(err => console.error('Error generating HTML report:', err));
