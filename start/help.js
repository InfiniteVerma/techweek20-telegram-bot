var bot = require("../bot");
// start command
bot.onText(/\/contact/, msg => {
  var phoneNumber = 919082318241;
  console.log(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'Kindly contact the number given below for help in registration or any event related queries.').then(()=>{
    bot.sendContact(msg.chat.id, phoneNumber, "Vineet")
  })
});
