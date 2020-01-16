var bot = require("../bot");
//Describe CS Events
bot.onText(/\/compScience/, msg => {
  bot.sendMessage(msg.chat.id, "Computer Science Events: \n\n"+
  "1. CodeQuest - A team of 2 will answer questions based on coding skills and logic. The more you uncover in the map, the faster you win."+
  "\n2. Expedition - The online coding competition hosted on Hackerrank. Arm yourself with logic and coding for this quest." +
  "\n\nTo register: \n"+
  "1. /CodeQuest"+
  "\n2. (Link to competition will be provided later!)");
});
