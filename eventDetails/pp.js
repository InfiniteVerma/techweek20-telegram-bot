var bot = require("../bot");
//Describe the paper presentation event
bot.onText(/\/pp/, msg => {
  bot.sendMessage(msg.chat.id, "Paper Presentation Event Descriptions...");
});
