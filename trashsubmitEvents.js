
var bot = require('./bot')
//displays the final selection and submits it into the DB
bot.onText(/\/submitEvents/, msg => {
    if (allEvents != "")
      bot.sendMessage(msg.chat.id, "Now submitting these events: \n" + allEvents);
  });
  