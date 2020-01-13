var bot = require("../bot");
//Describe Electronic Events
bot.onText(/\/elec/, msg => {
  bot.sendMessage(msg.chat.id, "Electronic Event Descriptions...");
});
