var bot = require("../bot");

//Describe Informal events
bot.onText(/\/informals/, msg => {
  bot.sendMessage(msg.chat.id, "Informal Events: \n\n"+
  "1. Scout About – A treasure hunt event for teams. Hunt down locations by solving riddles and collect the puzzle pieces in a battle against time."+
  "\n2. InQUIZtive – A quiz event for teams. Answer questions and solve puzzles by travelling to different times and realities – finish the quest to win." +
  "\n\nTo register: \n"+
  "1. /ScoutAbout"+
  "\n2. /inQuizitive")
});
