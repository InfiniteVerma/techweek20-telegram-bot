
var bot = require("../bot");
//Describe the hackathon
bot.onText(/\/graphics/, msg => {
  bot.sendMessage(msg.chat.id, "Graphics Event:\n\n"+
  "Magna Odyssey – Depict your adventure through unknown lands using a limited set of tools. Emerge the victor and take away your design on a T-shirt.\n"+
  "\nTo Register: /MagnaOdeyssey");
});
1