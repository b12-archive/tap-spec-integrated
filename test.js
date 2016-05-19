'use strict'; // eslint-disable-line strict
  // http://stackoverflow.com/q/33063206

// Format my own tests, FTW!
require('.');

const test = require('tape-catch');
const proxyquire = require('proxyquire');
const naked = require('strip-ansi');

test('Doesn’t break `console.log`', (is) => {
  const logMessage = 'just logging stuff';
  const extraLogData = {};
  const log = (message, otherArg) => {
    is.equal(naked(message), logMessage,
      'leaves non-TAP log messages intact'
    );

    is.equal(otherArg, extraLogData,
      'leaves extra log data intact'
    );

    is.end();
  };

  const mockConsole = { log };
  proxyquire('.', { global: { console: mockConsole } });

  is.notEqual(mockConsole.log, log,
    'wraps the native `console.log`'
  );

  mockConsole.log(logMessage, extraLogData);
});

test('Strips off data for machines', (is) => {
  const log = (message) => {
    is.fail(`ignores a “${message}” log line`);
  };

  const mockConsole = { log };
  proxyquire('.', { global: { console: mockConsole } });

  mockConsole.log('TAP version 13');
  mockConsole.log('1..178');
  is.end();
});

test('Adds some space around test titles', (is) => {
  is.plan(2);

  const title = 'Whatever';
  const log = (message) => {
    is.notOk(/#/.test(naked(message)),
      'strips the `# ` off the beginning'
    );

    is.equal(naked(message), `\n${title}\n`,
      'adds a newline above and below'
    );
  };

  const mockConsole = { log };
  proxyquire('.', { global: { console: mockConsole } });

  mockConsole.log(`# ${title}`);
  is.end();
});

test('Changes an `ok <number>` into an indented `✔`', (is) => {
  is.plan(2);

  const comment = 'Whatever';
  const log = (message) => {
    is.notOk(/^ok/.test(naked(message)),
      'strips the `ok <number> ` off the beginning'
    );

    is.equal(naked(message), `  ✔ ${comment}`,
      'adds an indented ✔ instead'
    );
  };

  const mockConsole = { log };
  proxyquire('.', { global: { console: mockConsole } });

  mockConsole.log(`ok 17 ${comment}`);
  is.end();
});

test('Changes a `not ok <number>` into an indented `✘`', (is) => {
  is.plan(2);

  const comment = 'Whatever';
  const log = (message) => {
    is.notOk(/^not ok/.test(naked(message)),
      'strips the `not ok <number> ` off the beginning'
    );

    is.equal(naked(message), `  ✘ ${comment}`,
      'adds an indented ✘ instead'
    );
  };

  const mockConsole = { log };
  proxyquire('.', { global: { console: mockConsole } });

  mockConsole.log(`not ok 58 ${comment}`);
  is.end();
});

test('Cleans up the test footer', (is) => {
  const footer = [
    '# tests 9',
    '# pass  9',
    '# fail  0',
    '',
    '# ok',
  ];

  is.plan(footer.length);

  let counter = 0;
  const log = (message) => {
    is.equal(
      naked(message),
      footer[counter].replace(/^# /, ''),
      `strips the \`# \` off in line n° ${counter + 1}`
    );
    counter++;
  };

  const mockConsole = { log };
  proxyquire('.', { global: { console: mockConsole } });

  footer.forEach(message => mockConsole.log(message));
  is.end();
});
