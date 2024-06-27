import * as fs from 'fs';

export function updateCucumberReport(results: any[], jsonFilePath: string) {
  try {
    const rawData = fs.readFileSync(jsonFilePath, 'utf-8');
    const reportData = JSON.parse(rawData);
    
    // Push or merge new results into the reportData array
    results.forEach(result => {
      reportData.push(result);
    });

    fs.writeFileSync(jsonFilePath, JSON.stringify(reportData, null, 2));
    
    console.log(`Updated ${jsonFilePath} with latest test results.`);
  } catch (error) {
  }
}
