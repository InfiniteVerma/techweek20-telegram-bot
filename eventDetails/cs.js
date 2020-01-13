var bot = require("../bot");
//Describe CS Events
bot.onText(/\/cs/, msg => {
  bot.sendMessage(msg.chat.id, "Computer Science Event Descriptions...");
});
