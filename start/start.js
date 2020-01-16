var bot = require("../bot");
// start command
bot.onText(/\/start/, msg => {
  console.log(msg.chat.id);
  bot.sendMessage(
    msg.chat.id,
    "Welcome, " +
      msg.from.first_name +
      ". I'm NAOMI (Navigare's Autonomous Objective Mobile Interface)." +
      " I'm here to assist you with the Techweek registration process.\n"
  ).then(()=>{
    bot.sendMessage(msg.chat.id, "These are the things I can do: \n" +
    "1: Individual User Registration /register\n" + 
    "2: Event Details /eventDetails\n"
    // "3: Event Registration "
    ).then(()=>{
      bot.sendMessage(msg.chat.id, 'Tips: \n1:In case the bot hangs, please wait for a few minutes before trying again.'+
      '\n2: After registering, you can view your participation id through /partDetails'+
      '\n3: Use /help to get human assistance'+
      '\n4: Check out my /developers')
    })
  })
});
