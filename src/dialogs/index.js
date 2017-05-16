import bot from '../controllers/bot';
import './add-note';
import './all-notes';
import './help';
import './read-note'
import './remove-note'

bot.dialog('/', [
  function (session, results) {
    session.send(`Try typing "help" to see a list of all the available commands!`);
  }
]);
