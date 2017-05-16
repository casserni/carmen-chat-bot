import bot from '../controllers/bot';
import verifyUserProfile from './profile.js';

bot.dialog('/help', [
  verifyUserProfile,
  function (session) {
    session.send(
      `
      Here are a few of the things that I can help you with:
      - all notes
      - new note
      - read *note title*
      - delete *note title*
      `
    );
    session.endDialog();
  }
]).triggerAction({matches: /help/i});
