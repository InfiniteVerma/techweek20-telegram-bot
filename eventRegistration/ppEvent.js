var bot = require("../bot.js");
const { Client } = require("pg");

bot.onText(/\/InnovativeEdge/, msg => {
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
            console.log("That seems invalid, Please try again! /Scientia");
          else {
            userid = reply.text;
            //Creating a client and connecting to DB
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
            var getAllParticipantIdQuery =
              "Select id from techweek.participant";
            var queryString =
              "Insert into techweek.ppevent (name, ppevent_participant_id) values ($1, $2) returning *";
            client.query(getAllParticipantIdQuery, (err, data) => {
              if (err) {
                console.log(err);
                client.end();
              } else {
                var idList = data.rows;
                console.log(idList);
                idList.forEach(element => {
                  if (
                    element.id == parseInt(userid) &&
                    element.id != 202046000
                  ) {
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
                        bot.sendMessage(
                          msg.chat.id,
                          "Something went wrong! Try again"
                        );
                      } else {
                        console.log("Successful!");
                        client.end();
                        bot.sendMessage(
                          msg.chat.id,
                          "You are now registered for Innovative Edge!"
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
        }
      );
    });
});
