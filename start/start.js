var bot = require("../bot");
// start command
bot.onText(/\/start/, msg => {
  console.log(msg.chat.id);
  bot.sendMessage(
    msg.chat.id,
    "Welcome, " +
      msg.from.first_name +
      ". Commands available: \n/register\n/eventDetails\n/eventRegistration"
  );
});
