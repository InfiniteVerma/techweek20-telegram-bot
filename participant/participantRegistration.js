var bot = require("../bot");

//variables to store user input

const requestPhoneKeyboard = {
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [
      [
        {
          text: "My phone number",
          request_contact: true,
          one_time_keyboard: true
        }
      ],
      ["Cancel"]
    ]
  }
};

//register command to store user information
bot.onText(/\/register/, msg => {
  var email;
  var outstation;
  var phone_number;
  if (phone_number != undefined) {
    // bot.sendMessage(msg.chat.id, "You've already entered your details");
    bot.sendMessage(
      msg.chat.id,
      "Editing your details, " + msg.chat.first_name
    );
    bot
      .sendMessage(msg.chat.id, "Enter email", {
        reply_markup: JSON.stringify({ force_reply: true })
      })
      .then(sentMessage => {
        bot.onReplyToMessage(
          sentMessage.chat.id,
          sentMessage.message_id,
          reply => {
            if (reply.text == "") {
              console.log("error");
            } else {
              email = reply.text;
              console.log(reply.text);
              bot
                .sendMessage(msg.chat.id, "Enter yes if outstation", yesno)
                .then(() => {
                  bot.once("message", answer => {
                    if (answer.text == "Yes" || answer.text == "No") {
                      console.log("asdf" + answer.text);
                      outstation = answer.text;
                      bot.sendMessage(
                        msg.chat.id,
                        "Form successfully edited. Check out your new details at /details"
                      );
                    } else {
                      bot.sendMessage(
                        msg.chat.id,
                        "Editing was unsuccessful. See your /details or try again to /register"
                      );
                    }
                  });
                });
            }
          }
        );
      });
  } else {
    bot.sendMessage(
      msg.chat.id,
      "Got it! Starting your form, " + msg.chat.first_name
    );
    bot
      .sendMessage(msg.chat.id, "Enter email", {
        reply_markup: JSON.stringify({ force_reply: true })
      })
      .then(sentMessage => {
        bot.onReplyToMessage(
          sentMessage.chat.id,
          sentMessage.message_id,
          reply => {
            email = reply.text;
            console.log(reply.text);
            bot
              .sendMessage(msg.chat.id, "Enter yes if outstation", {
                reply_markup: JSON.stringify({ force_reply: true })
              })
              .then(sentMessage => {
                bot.onReplyToMessage(
                  sentMessage.chat.id,
                  sentMessage.message_id,
                  reply => {
                    if (reply.text == "") {
                      console.log("error");
                    } else {
                      outstation = reply.text;
                      console.log(reply.text);

                      bot
                        .sendMessage(
                          msg.chat.id,
                          "Please give us access to your phone number: (necessary)",
                          requestPhoneKeyboard
                        )
                        .then(sentMessage => {
                          sentMessage.chat.id,
                            sentMessage.message_id,
                            bot.on("contact", function(msg, match) {
                              console.log(msg.contact.phone_number);
                              phone_number = msg.contact.phone_number;
                            });

                          bot.on("message", msg => {
                            if (msg.text == "Cancel") {
                              bot.sendMessage(
                                msg.chat.id,
                                "Your phone number is necessary! /register again"
                              );
                            } else if (msg.text == undefined) {
                              bot
                                .sendMessage(
                                  msg.chat.id,
                                  "Thanks for entering the form. These are your details.\n" +
                                    "Name: " +
                                    msg.chat.first_name +
                                    "\nEmail: " +
                                    email +
                                    "\nOutstation: " +
                                    outstation
                                )
                                .then(() => {
                                  bot.sendMessage(
                                    msg.chat.id,
                                    "Use /submitForm to finish your registration"
                                  );
                                });
                            }
                          });
                        });
                    }
                  }
                );
              });
          }
        );
      });
  }
});
exports.getOutstation = () => {
  return outstation;
};
exports.getEmail = () => {
  return email;
};
exports.getPhoneNumber = () => {
  return phone_number;
};
