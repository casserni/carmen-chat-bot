import bot from '../controllers/bot';
import verifyUserProfile from './profile';

bot.dialog('/all-notes', [
  verifyUserProfile,
  function (session) {
    if(session.message.ctx.user.notes.length === 0){
      session.send(`You currently don't have any notes. You can add one by typing "new note"`);
    } else {
      let titles = `\t${session.message.ctx.user.firstName}'s Notes\n`;
      session.message.ctx.user.notes.forEach((note) =>{
        titles += `\n\t-${note.title}`;
      });
      titles += '\n\n\tTo read one of your notes type "read *note title*"'
      session.send(titles);
    }
  session.endDialog();
  }
]).triggerAction({matches: /(all|list|my).*notes/i});
