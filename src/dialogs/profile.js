import builder from 'botbuilder';
import bot from '../controllers/bot';
import { getEmail } from '../util/regex';
import handleSponsoredDialog from '../util/handle-sponsored-dialog';

const verifyUserProfile = (session, args, next) => {
  if (!session.message.ctx.user.isSetup()) {
    session.beginDialog('/profile');
  } else {
    next();
  }
};

bot.dialog('/profile', [
  // starts the dialog letting the user know we need to collect some information
  function (session, args, next) {
    session.message.utu.event('Setup Profile');
    if (!session.message.ctx.user.email) {
      builder.Prompts.text(session, 'Hi, I just need to collect a few pieces of information from you since this is our first time talking! What is your email?');
      session.message.utu.intent('initial-setup').then(handleSponsoredDialog(session)).catch(e => console.log(e));
    } else {
      next();
    }
  },

  // checks for existing identities and will merge them
  // update utu and end the dialog, if we don't have an identity
  // then the user is new and we need to continue with the dialog
  async function (session, results, next) {
    if (results.response) {
      const emails = getEmail(results.response);
      const email = emails[0] && emails[0].toLowerCase();

      // if we didn't find an email do nothing so the bot will ask again
      if (!email) {
        return;
      }

      const restored = await session.message.ctx.user.restoreUserFromEmail(email);

      if (restored) {
        // let the user know we have identitied them from another platform
        session.send(`Oh, hi ${session.message.ctx.user.firstName}, Its good to see you again. I've synced your accounts now`);

        session.message.utu.intent('cross-channel-identified').then(handleSponsoredDialog(session)).catch(e => console.log(e));

        // update the users information in utu
        // session.message.ctx.user.saveUTU();

        // end the dialog because we don't need to collect any other information from the user
        session.endDialog();
      } else {
        // set the users email
        session.message.ctx.user.setEmail(email);
      }
    }

    if (!session.message.ctx.user.firstName) {
      builder.Prompts.text(session, 'What is your first name?');
    } else {
      next();
    }
  },

  // sets the first name and asks for a last name
  function (session, results, next) {
    if (results.response) {
      session.message.ctx.user.setFirstName(results.response);
    }

    if (!session.message.ctx.user.lastName) {
      builder.Prompts.text(session, 'What is your last name?');
    } else {
      next();
    }
  },

  // sets the last name
  function (session, results, next) {
    if (results.response) {
      session.message.ctx.user.setLastName(results.response);
    }
    session.message.ctx.user.setNotes();
    next();
  },

  // end of dialog this should finish the account setup
  // and update the utu profile
  function (session) {
    session.message.ctx.user.setSetup();
    // update the users information in utu
    // session.message.ctx.user.saveUTU();
    session.message.utu.event('Profile Setup');
    session.endDialog();
  },
]);

export default verifyUserProfile;
