import bot from '../controllers/bot.js';
import builder from 'botbuilder';
import verifyUserProfile from './profile.js';

bot.dialog('/read-note', [
  verifyUserProfile,
  function (session) {
    session.message.ctx.user.notes.forEach((note)=>{
      if(note.title.split(/\s+/).join(" ").toUpperCase() === session.message.text.split(/\s+/).splice(1).join(" ").toUpperCase()) {
        session.send(
        `
        Title: ${note.title}

        Body:
        ${note.body}
        `
        )
      }
    })
    session.endDialog()
  }
]).triggerAction({matches: /(read).*/i});
