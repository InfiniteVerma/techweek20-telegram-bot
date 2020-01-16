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
    ).then(()=>{
      bot.sendMessage(
        msg.chat.id,
        "Tips: \n1: In case the bot hangs, wait for a few minutes before trying again.\n" +
          "2: You can view your Participant Id through /partDetails" +
          "\n4: Having problems? Use /contact to get human assistance" +
          "\n5: Follow the IEEE SBM Instagram and Facebook page to get updates" +
          "\n5: Check out my /developers :)"
      );
    })
  })
});
