require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// start command
bot.onText(/\/start/, msg => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome, " +
      msg.from.first_name +
      ". Commands available: \n/register\n/eventDetails\n/eventRegistration"
  );
});

//variables to store user input
var email;
var outstation;
var phone_number;
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
var submittedPhoneNumber = false;
//register command to store user information
bot.onText(/\/register/, msg => {
  if (phone_number != undefined) {
    // bot.sendMessage(msg.chat.id, "You've already entered your details");
    bot.sendMessage(
      msg.chat.id,
      "Got it! Editing your details, " + msg.chat.first_name
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
                .sendMessage(msg.chat.id, "Enter yes if outstation", {
                  reply_markup: JSON.stringify({ force_reply: true })
                })
                .then(sentMessage => {
                  bot.onReplyToMessage(
                    sentMessage.chat.id,
                    sentMessage.message_id,
                    reply => {
                      outstation = reply.text;
                      console.log(reply.text);
                      bot.sendMessage(
                        msg.chat.id,
                        "Form successfully edited. Check out your new details at /details"
                      );
                    }
                  );
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
            if (reply.text == "") {
              console.log("error");
            } else {
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
                            "Can we get access to your phone number?",
                            requestPhoneKeyboard
                          )
                          .then(sentMessage => {
                            sentMessage.chat.id,
                              sentMessage.message_id,
                              bot.on("contact", function(msg, match) {
                                bot.sendMessage(
                                  msg.chat.id,
                                  "Thanks for entering your details! Check out /details"
                                );
                                console.log(msg.contact.phone_number);
                                phone_number = msg.contact.phone_number;
                              });
                          });
                      }
                    }
                  );
                });
            }
          }
        );
      });
  }
});

//details command shows user information stored
bot.onText(/\/details/, msg => {
  if (email == undefined || outstation == undefined) {
    console.log("Empty!");
    bot.sendMessage(msg.chat.id, "Use /register command first!");
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
          "If information is wrong, use /register to reenter. Otherwise use /submit to submit"
        );
      });
  }
});

//finally submitForm inserts it into the DB
bot.onText(/\/submitForm/, msg => {
  bot.sendMessage(msg.chat.id, "Yet to build this function");
});

/*
  Displays all events and commands for each event
*/
bot.onText(/\/eventDetails/, msg => {
  bot
    .sendMessage(
      msg.chat.id,
      "These are our events, " +
        msg.chat.first_name +
        "\n" +
        "\nCS: Offline and online" +
        "\nElectronics: Workshop and Competition" +
        "\nPaper Presentation" +
        "\nHackathon" +
        "\nInformal Events"
    )
    .then(() => {
      bot.sendMessage(
        msg.chat.id,
        "To know more about any event, use these commands: " +
          "\nComputer Science: /cs" +
          "\nElectronics: /elec" +
          "\nInformals: /info" +
          "\nPaper Presentation: /pp" +
          "\nHackathon: /hack"
      );
    });
});

//Describe CS Events
bot.onText(/\/cs/, msg => {
  bot.sendMessage(msg.chat.id, "Computer Science Event Descriptions...");
});
//Describe Electronic Events
bot.onText(/\/elec/, msg => {
  bot.sendMessage(msg.chat.id, "Electronic Event Descriptions...");
});
//Describe Informal events
bot.onText(/\/info/, msg => {
  bot.sendMessage(msg.chat.id, "Informal Event Descriptions...");
});
//Describe the paper presentation event
bot.onText(/\/pp/, msg => {
  bot.sendMessage(msg.chat.id, "Paper Presentation Event Descriptions...");
});
//Describe the hackathon
bot.onText(/\/hack/, msg => {
  bot.sendMessage(msg.chat.id, "Hackathon Event Descriptions...");
});

var eventOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "CS1", callback_data: "cs1" }],
      [{ text: "CS2", callback_data: "cs2" }],
      [{ text: "Electronics1", callback_data: "elec1" }],
      [{ text: "Electronics2", callback_data: "elec2" }],
      [{ text: "Informals1", callback_data: "info1" }],
      [{ text: "Informals2", callback_data: "info2" }],
      [{ text: "Paper Presentation", callback_data: "pp" }],
      [{ text: "Hackathon", callback_data: "hack" }],
      [{ text: "Submit", callback_data: "submit" }]
    ]
  }
};
var allEvents = "";
var events = [];

//This command stores user's selection of events;
bot.onText(/\/eventRegistration/, msg => {
  bot.sendMessage(
    msg.chat.id,
    "This method for events registration!\n(To view all our events, try /eventDetails)"
  );
  //check if user has entered his details
  allEvents = "";
  bot.sendMessage(msg.chat.id, "Choose your events", eventOptions);
});
bot.on("callback_query", callbackQuery => {
  let isPresent = false;
  const message = callbackQuery.message;
  console.log(callbackQuery.data);

  //if submit is selected
  if (callbackQuery.data == "submit") {
    if (allEvents != "") {
      bot
        .sendMessage(
          message.chat.id,
          "These are your selected events:\n" + allEvents
        )
        .then(() => {
          bot.sendMessage(
            message.chat.id,
            "Do you confirm your selection? /submitEvents"
          );
          return;
        });
    } else {
      bot.sendMessage(message.chat.id, "Select at least an event first!");
    }
  } else {
    for (let i = 0; i < events.length; i++) {
      if (events[i] == callbackQuery.data) {
        events.splice(i, 1);
        isPresent = true;
      }
    }
    if (isPresent == false) {
      events.push(callbackQuery.data);
    }
    allEvents = "";
    events.forEach(element => {
      allEvents += element + "\n";
    });
  }
});

//displays the final selection and submits it into the DB
bot.onText(/\/submitEvents/, msg => {
  if (allEvents != "")
    bot.sendMessage(msg.chat.id, "Now submitting these events: \n" + allEvents);
});
