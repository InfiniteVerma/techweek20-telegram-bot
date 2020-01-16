var bot = require("../bot");
// start command
bot.onText(/\/help/, msg => {
  console.log(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'You have called the help function!')
});
