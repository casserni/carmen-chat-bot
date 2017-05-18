'use strict';

var _bot = require('../controllers/bot');

var _bot2 = _interopRequireDefault(_bot);

var _profile = require('./profile.js');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bot2.default.dialog('/help', [_profile2.default, function (session) {
  session.send('\n      Here are a few of the things that I can help you with:\n      - all notes\n      - new note\n      - read *note title*\n      - delete *note title*\n      ');
  session.endDialog();
}]).triggerAction({ matches: /help/i });