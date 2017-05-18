'use strict';

var _bot = require('../controllers/bot');

var _bot2 = _interopRequireDefault(_bot);

require('./add-note');

require('./all-notes');

require('./help');

require('./read-note');

require('./remove-note');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bot2.default.dialog('/', [function (session, results) {
  session.send('Try typing "help" to see a list of all the available commands!');
}]);