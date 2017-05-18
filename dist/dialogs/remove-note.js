'use strict';

var _bot = require('../controllers/bot.js');

var _bot2 = _interopRequireDefault(_bot);

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

var _profile = require('./profile.js');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bot2.default.dialog('/remove-note', [
// verifyUserProfile,
function (session) {
  session.dialogData.note = session.message.text.split(/\s+/).splice(1).join(" ");
  _botbuilder2.default.Prompts.text(session, 'Are you sure that you want to delete the note: ' + session.dialogData.note + ' (yes/no)?');
}, function (session, results) {
  if (/(YES|YEA|YEAH|Y|YA|YAY)/.test(results.response.toUpperCase())) {
    session.message.ctx.user.notes.forEach(function (note) {
      if (note.title.split(/\s+/).join(" ") === session.dialogData.note) {
        session.message.ctx.user.removeNote({ notes: note });
      }
    });
    session.send('Note Removed!');
  }
  session.endDialog();
}]).triggerAction({ matches: /(delete|remove).*/i });