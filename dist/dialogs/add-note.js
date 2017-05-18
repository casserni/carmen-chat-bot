'use strict';

var _bot = require('../controllers/bot.js');

var _bot2 = _interopRequireDefault(_bot);

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

var _profile = require('./profile.js');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bot2.default.dialog('/add-note', [_profile2.default, function (session) {
  _botbuilder2.default.Prompts.text(session, 'What would you like to title your new note?');
}, function (session, results, next) {
  session.dialogData.title = results.response;
  var repeatedTitle = void 0;
  session.message.ctx.user.notes.forEach(function (note) {
    if (session.dialogData.title.split(/\s+/).join(" ").toUpperCase() === note.title.toUpperCase()) {
      session.send('A note with that title already exists!');
      repeatedTitle = true;
    }
  });
  if (repeatedTitle) {
    next();
  } else {
    _botbuilder2.default.Prompts.text(session, 'What would you like to jot down?');
  }
}, function (session, results) {
  if (results.response) {
    session.message.ctx.user.addNote({ notes: { title: session.dialogData.title.split(/\s+/).join(" "), body: results.response } });
    session.send('Note Added!');
  }
  session.endDialog();
}]).triggerAction({ matches: /(add|new).*note/i });