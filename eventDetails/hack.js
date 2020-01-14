var bot = require("../bot");
//Describe the hackathon
bot.onText(/\/1hack/, msg => {
  bot.sendMessage(msg.chat.id, "Hackathon Event Descriptions...");
});
