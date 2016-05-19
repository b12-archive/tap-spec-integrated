const globalConsole = require('global').console;
const chalk = require('chalk');
const originalConsoleLog = globalConsole.log;

const plan = /^\d+\.\.\d+$/;
const footer = /^#\s+(tests\b|pass\b|fail\b|ok$)/;
const comment = /^#\s+/;
const ok = /^ok\s+\d+\s+/;
const notOk = /^not ok\s+\d+\s+/;

globalConsole.log = function consoleLog() {
  const message = arguments[0];
  if (typeof message !== 'string') {
    return originalConsoleLog.apply(globalConsole, arguments);
  }

  const otherArgs = Array.prototype.slice.call(arguments, 1);
  if ((
    message === 'TAP version 13' ||
    plan.test(message)
  ) && !otherArgs.length) {
    return originalConsoleLog.apply(globalConsole, ['']);
  }

  const reformattedMessage = (
    (footer.test(message) &&
      chalk.bold(message.replace(comment, ''))
    ) ||
    (comment.test(message) &&
      `\n${chalk.bold(message.replace(comment, ''))}\n`
    ) ||
    (ok.test(message) &&
      message.replace(ok, `  ${chalk.green('✔')} `)
    ) ||
    (notOk.test(message) &&
      chalk.red(message.replace(notOk, '  ✘ '))
    ) ||
    chalk.dim(message)
  );

  return originalConsoleLog.apply(globalConsole,
    [reformattedMessage].concat(otherArgs)
  );
};
