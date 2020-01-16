var bot = require("../bot");
//Describe the paper presentation event
bot.onText(/\/paperPres/, msg => {
  bot.sendMessage(msg.chat.id, "Paper Presentation Event:\n\n"+
  "The Innovative Edge – A paper presentation event focusing on modern problems. Showcase your paper and defend it in front of expert judges.\n"+
  "\nTo Register: /InnovativeEdge");
});
