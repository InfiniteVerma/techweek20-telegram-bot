var bot = require("../bot.js");
const { Client } = require("pg");
var yesno = {
  // parse_mode: "Markdown",
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [["Yes"], ["No"]]
    // }
  }
};
var userid;
bot.onText(/\/MagnaOdeyssey/, msg => {
  bot
    .sendMessage(msg.chat.id, "Please Enter your user ID", {
      reply_markup: JSON.stringify({ force_reply: true })
    })
    .then(sentMessage => {
      bot.onReplyToMessage(
        sentMessage.chat.id,
        sentMessage.message_id,
        reply => {
          if (reply.text == "" || parseInt(reply.text) == NaN)
            console.log("That seems invalid, Please try again! /MagnaOdeyssey");
          else {
            userid = reply.text;
            bot
              .sendMessage(msg.chat.id, "Should I submit this? ", yesno)
              .then(() => {
                bot.once("message", answer => {
                  if (answer.text == "Yes") {
                    bot
                      .sendMessage(
                        msg.chat.id,
                        "Confirmed! Please wait while I enter your details"
                      )
                      .then(() =>
                        insertInDatabase(msg, msg.chat.first_name, userid)
                      );
                  } else {
                    bot.sendMessage(
                      msg.chat.id,
                      "Ok. Try filling the form again by /MagnaOdeyssey."
                    );
                  }
                });
              });
          }
        }
      );
    });
});

function insertInDatabase(msg, name, userid) {
  console.log("Name: " + name + "userid: " + userid);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  client.connect(err => {
    if (err) {
      console.log(err);
      bot.sendMessage(msg.chat.id, "Something went wrong! Try again");
      return;
    } else {
      console.log("connected!");
    }
  });
  var idIsPresentInDB = false;
  var getAllParticipantIdQuery = "Select id from techweek.participant";
  var queryString =
    "Insert into techweek.magna (name, manga_participant_id) values ($1, $2) returning *";
  client.query(getAllParticipantIdQuery, (err, data) => {
    if (err) {
      console.log(err);
      client.end();
    } else {
      var idList = data.rows;
      console.log(idList);
      idList.forEach(element => {
        if (element.id == parseInt(userid) && element.id != 202046000) {
          idIsPresentInDB = true;
        }
      });
      if (idIsPresentInDB == true) {
        client.query(
          queryString,
          [msg.chat.first_name, userid],
          (err, data) => {
            if (err) {
              console.log(err);
              client.end();
              bot.sendMessage(msg.chat.id, "Something went wrong! Try again");
            } else {
              console.log("Successful!");
              client.end();
              bot.sendMessage(
                msg.chat.id,
                "You are now registered for MangaOdeyssey!"
              );
            }
          }
        );
      } else {
        bot.sendMessage(
          msg.chat.id,
          "That particular id is not in our database. Kindly /register before choosing your events"
        );
      }
    }
  });
}
