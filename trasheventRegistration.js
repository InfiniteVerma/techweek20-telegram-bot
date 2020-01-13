var bot = require('./bot')
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
  