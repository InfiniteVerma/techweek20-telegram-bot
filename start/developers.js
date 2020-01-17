var bot = require("../bot");
// start command
bot.onText(/\/developers/, msg => {
  console.log(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'Developers: \nKishor (mentor)\nAnant\nShubham')
});
