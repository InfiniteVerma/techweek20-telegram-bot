var bot = require("../bot");
//Describe the hackathon
bot.onText(/\/hack/, msg => {
  bot.sendMessage(msg.chat.id, "Hackathon Event Descriptions...");
});
