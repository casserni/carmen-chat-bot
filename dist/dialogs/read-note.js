'use strict';

var _bot = require('../controllers/bot.js');

var _bot2 = _interopRequireDefault(_bot);

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

var _profile = require('./profile.js');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bot2.default.dialog('/read-note', [_profile2.default, function (session) {
  session.message.ctx.user.notes.forEach(function (note) {
    if (note.title.split(/\s+/).join(" ").toUpperCase() === session.message.text.split(/\s+/).splice(1).join(" ").toUpperCase()) {
      session.send('\n        Title: ' + note.title + '\n\n        Body:\n        ' + note.body + '\n        ');
    }
  });
  session.endDialog();
}]).triggerAction({ matches: /(read).*/i });