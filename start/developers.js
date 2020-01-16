var bot = require("../bot");
// start command
bot.onText(/\/developers/, msg => {
  console.log(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'Developer Credits: \n'+
  '1. Anant Verma\n' + 
  '2. Shubham Sachdeva')
});
