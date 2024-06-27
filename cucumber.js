const common = [
    'e2e/features/**/*.feature',
    '--require-module ts-node/register',
    '--require e2e/step-definitions/**/*.ts',
    '--require e2e/runtime/hooks.ts',
    '--format progress-bar',
    '--format json:e2e/runtime/reports/cucumber_report.json'
  ].join(' ');
  
  module.exports = {
    default: common
  };
