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
