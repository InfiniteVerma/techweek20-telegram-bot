var bot = require("../bot");

//Describe Informal events
bot.onText(/\/info/, msg => {
  bot.sendMessage(msg.chat.id, "Informal Event Descriptions...");
});
