import bot from '../controllers/bot.js';
import builder from 'botbuilder';
import verifyUserProfile from './profile.js';

bot.dialog('/remove-note', [
  // verifyUserProfile,
  function (session) {
    session.dialogData.note = session.message.text.split(/\s+/).splice(1).join(" ")
    builder.Prompts.text(session, `Are you sure that you want to delete the note: ${session.dialogData.note} (yes/no)?`);
  },
  function (session, results) {
    if(/(YES|YEA|YEAH|Y|YA|YAY)/.test(results.response.toUpperCase()) ){
      session.message.ctx.user.notes.forEach((note)=>{
        if(note.title.split(/\s+/).join(" ") === session.dialogData.note) {
          session.message.ctx.user.removeNote({ notes: note })
        }
      })
      session.send('Note Removed!')
    }
    session.endDialog()
  }
]).triggerAction({matches: /(delete|remove).*/i});
