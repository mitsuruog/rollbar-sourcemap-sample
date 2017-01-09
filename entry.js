require('./src/style.css');
require('./src/main');

console.log('it works.');

const rollbarConfig = {
  accessToken: 'f1d518135181416b95b63497e18263df',
  captureUncaught: true,
  payload: {
    environment: 'development',
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: "0.0.1",
        // Optionally have Rollbar guess which frames the error was thrown from
        // when the browser does not provide line and column numbers.
        guess_uncaught_frames: true
      }
    }
  }
};

const Rollbar = require('./src/rollbar.umd.nojson.min').init(rollbarConfig);

try {
  foo();
  Rollbar.debug('foo() called');
} catch (e) {
  Rollbar.error('Problem calling foo()', e);
}
