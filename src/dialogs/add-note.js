import bot from '../controllers/bot.js';
import builder from 'botbuilder';
import verifyUserProfile from './profile.js';

bot.dialog('/add-note', [
  verifyUserProfile,
  function (session) {
    builder.Prompts.text(session, 'What would you like to title your new note?');
  },
  function (session, results, next) {
    session.dialogData.title = results.response;
    let repeatedTitle;
    session.message.ctx.user.notes.forEach((note)=>{
      if(session.dialogData.title.split(/\s+/).join(" ").toUpperCase() === note.title.toUpperCase()){
        session.send('A note with that title already exists!')
        repeatedTitle = true
      }
    })
    if(repeatedTitle) {
      next();
    } else{
      builder.Prompts.text(session, 'What would you like to jot down?');
    }
  },

  function (session, results) {
    if(results.response){
      session.message.ctx.user.addNote({ notes: { title: session.dialogData.title.split(/\s+/).join(" "), body: results.response } })
      session.send('Note Added!');
    }
    session.endDialog();
  }
]).triggerAction({matches: /(add|new).*note/i});
