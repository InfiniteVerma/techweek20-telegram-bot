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
var team = {};
var arrayOfTeams = [];
bot.onText(/\/MagnaOdeyssey/, msg => {
  team = {
    id: "id",
    leaderName: "leaderName",
    id1: "id1"
  };
  team.id = msg.chat.id;
  team.leaderName = msg.chat.first_name;
  bot
    .sendMessage(msg.chat.id, "Please Enter your user ID", {
      reply_markup: JSON.stringify({ force_reply: true })
    })
    .then(sentMessage => {
      bot.onReplyToMessage(
        sentMessage.chat.id,
        sentMessage.message_id,
        reply => {
          if (
            reply.text == "" ||
            parseInt(reply.text) == NaN ||
            reply.text.length != 9
          ) {
            console.log("That seems invalid, Please try again! /MagnaOdeyssey");
            bot.sendMessage(
              msg.chat.id,
              "That seems invalid, Please try again! /MagnaOdeyssey"
            );
          } else {
            userid = reply.text;
            team.id1 = reply.text;
            bot
              .sendMessage(msg.chat.id, "Should I submit this? ", yesno)
              .then(() => {
                bot.once("message", answer => {
                  if (answer.text == "Yes") {
                    arrayOfTeams.push(team)
                    bot
                      .sendMessage(
                        msg.chat.id,
                        "Confirmed! Please wait while I enter your details"
                      )
                      .then(() =>{
                        insertInDatabase(msg, arrayOfTeams)
                        arrayOfTeams.shift()
                        console.log(arrayOfTeams)
                      });
                  } else {
                    bot.sendMessage(
                      msg.chat.id,
                      "Ok. Try filling the form again by /MagnaOdeyssey."
                    );
                    arrayOfTeams.shift();
                    console.log(arrayOfTeams);
                  }
                });
              });
          }
        }
      );
    });
});

function insertInDatabase(msg, arrayOfTeams) {
  var id1, leaderName;
  arrayOfTeams.forEach(element => {
    if (msg.chat.id == element.id) {
      leaderName = element.leaderName;
      id1 = element.id1;
      // phone_number = element.phone_number;
    }
  });
  console.log("Name: " + leaderName + "userid: " + userid);
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
  var checkIfAlreadyRegisteredQuery = `select * from techweek.magna where manga_participant_id=${userid}`;
  var insertIntoDBQuery =
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
        client.query(checkIfAlreadyRegisteredQuery, (err, data) => {
          if (err) {
            console.log(err);
            client.end();
          } else {
            var ans = data.rows[0];
            console.log(ans);
            if (ans == undefined) {
              console.log("Is not in pp database, inserting");
              client.query(
                insertIntoDBQuery,
                [leaderName, id1],
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
                      "You are now registered for MangaOdeyssey!"
                  )
                  .then(() => {
                    bot.sendMessage(
                      msg.chat.id,
                      "Check out other events at /eventDetails or go back to /start"
                    );
                  });
                  }
                }
              );
            } else {
              bot.sendMessage(
                msg.chat.id,
                "You have already registered for MagnaOdeyssey!"
              ).then(() => {
                bot.sendMessage(
                  msg.chat.id,
                  "Check out other events at /eventDetails or go back to /start"
                );
              });
              client.end();
            }
          }
        });
      } else {
        bot.sendMessage(
          msg.chat.id,
          "That particular id is not in our database. Kindly /register before choosing your events")
      }
    }
  });
}
