'use babel';

import {JUnitXmlReporter} from 'jasmine-reporters';
import {SpecReporter} from 'jasmine-spec-reporter';

jasmine.getEnv().clearReporters();

jasmine.getEnv().addReporter(new JUnitXmlReporter({
    savePath: './coverage',
    consolidateAll: false
}));

jasmine.getEnv().addReporter(new SpecReporter({
  spec: {
    displayPending: true,
    displayStacktrace: true
  }
}));
