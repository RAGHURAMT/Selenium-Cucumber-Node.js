function parseTestSuites(xmlContent: string): string {
    const xmlDoc = new DOMParser().parseFromString(xmlContent, 'application/xml');
    const testSuiteNodes = xmlDoc.getElementsByTagName('testsuite');
    let htmlOutput = '';
  
    for (let i = 0; i < testSuiteNodes.length; i++) {
      const testSuiteNode = testSuiteNodes[i];
      const suiteName = testSuiteNode.getAttribute('name') || ''; // Handle null case with default empty string
      const suiteTime = parseFloat(testSuiteNode.getAttribute('time') || '0'); // Handle null case with default '0'
      const suiteTests = parseInt(testSuiteNode.getAttribute('tests') || '0', 10); // Handle null case with default '0'
      const suiteFailures = parseInt(testSuiteNode.getAttribute('failures') || '0', 10); // Handle null case with default '0'
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
      const caseName = testCase.getAttribute('name') || ''; // Handle null case with default empty string
      const caseTime = parseFloat(testCase.getAttribute('time') || '0'); // Handle null case with default '0'
      const caseClassname = testCase.getAttribute('classname') || ''; // Handle null case with default empty string
      const caseStatus = testCase.getElementsByTagName('failure').length > 0 ? 'failed' : 'passed';
  
      htmlOutput += `
        <div class="test-case ${caseStatus}">
          <p>${caseName} (${caseTime.toFixed(2)} seconds)</p>
        </div>
      `;
    }
  
    return htmlOutput;
  }
  