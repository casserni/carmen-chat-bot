'use strict';

var _bot = require('../controllers/bot');

var _bot2 = _interopRequireDefault(_bot);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bot2.default.dialog('/all-notes', [_profile2.default, function (session) {
  if (session.message.ctx.user.notes.length === 0) {
    session.send('You currently don\'t have any notes. You can add one by typing "new note"');
  } else {
    var titles = '\t' + session.message.ctx.user.firstName + '\'s Notes\n';
    session.message.ctx.user.notes.forEach(function (note) {
      titles += '\n\t-' + note.title;
    });
    titles += '\n\n\tTo read one of your notes type "read *note title*"';
    session.send(titles);
  }
  session.endDialog();
}]).triggerAction({ matches: /(all|list|my).*notes/i });