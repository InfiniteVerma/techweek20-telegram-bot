var bot = require('./bot')
var info = require('./participantRegistration')
//details command shows user information stored
bot.onText(/\/details/, msg => {
    email = info.getEmail()
    phone_number = info.getPhoneNumber()
    outstation = info.getOutstation()
    console.log('Email: '+email + 'Phone NUmber: ' + phone_number + 'Outstation: ' + outstation)
    if (email == undefined || outstation == undefined) {
      console.log("Empty!");
      
      bot.sendMessage(msg.chat.id, "Use /register command first!");
      return;
    } else if (phone_number == undefined) {
      bot.sendMessage(
        msg.chat.id,
        "Your phone number is necessary. \nKindly /register again."
      );
      return;
    } else {
      bot
        .sendMessage(
          msg.chat.id,
          "Name: " +
            msg.chat.first_name +
            "\nEmail: " +
            email +
            "\nOutstation: " +
            outstation +
            "\nPhone Number: " +
            phone_number
        )
        .then(sentMessage => {
          bot.sendMessage(
            msg.chat.id,
            "If information is wrong, use /register to reenter. Otherwise use /submitForm to submit"
          );
        });
    }
  });