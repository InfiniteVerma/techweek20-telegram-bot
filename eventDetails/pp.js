var bot = require("../bot");
//Describe the paper presentation event
bot.onText(/\/paperPres/, msg => {
  bot.sendMessage(msg.chat.id, "Paper Presentation Event:\n\n"+
  "Workshop - A Pre-TechWeek Workshop on paper presentation conducted by professor Nithesh Naik\n"+
  "The Innovative Edge – A paper presentation event focusing on modern problems. Showcase your paper and defend it in front of expert judges.\n"+
  "\nTo Register: \n1. Workshop is a walk in"+"\n2. /InnovativeEdge"
  ).then(()=>{
    bot.sendPhoto(msg.chat.id, "./iamges/ppwork.jpeg")
  })
});
