// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))


export default function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage',
      '@angular-devkit/build-angular/plugins/karma'
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: join(__dirname, '../../coverage/entity'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    customLaunchers: {
      ChromeCustom: {
        base: 'Chrome',
        flags: [
          '--user-data-dir=' + resolve(__dirname, '../.chrome')
        ]
      }
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeCustom'],
    restartOnFileChange: true
  });
};
