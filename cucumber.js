const common = [
    'e2e/features/**/*.feature',
    '--require-module ts-node/register',
    '--require e2e/step-definitions/**/*.ts',
    '--require e2e/runtime/hooks.ts',
    '--format progress-bar',
    // '--format node_modules/cucumber-pretty'
  ].join(' ');
  
  module.exports = {
    default: common
  };
