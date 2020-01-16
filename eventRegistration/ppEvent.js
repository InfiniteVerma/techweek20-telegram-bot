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
var team = {};
var arrayOfTeams = [];
bot.onText(/\/InnovativeEdge/, msg => {
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
          if (reply.text == "" || reply.text == NaN || reply.text.length != 9) {
            console.log(
              "That seems invalid, Please try again! /InnovativeEdge"
            );
            bot.sendMessage(
              msg.chat.id,
              "That seems invalid, please try again! /InnovativeEdge"
            );
          } else {
            userid = reply.text;
            team.id1 = reply.text;
            console.log(reply.text.length);

            bot
              .sendMessage(msg.chat.id, "Should I submit this? ", yesno)
              .then(() => {
                bot.once("message", answer => {
                  arrayOfTeams.push(team)
                  if (answer.text == "Yes") {
                    bot
                      .sendMessage(
                        msg.chat.id,
                        "Confirmed! Please wait while I enter your details"
                      )
                      .then(() => {
                        insertIntoDB(msg, arrayOfTeams)
                        arrayOfTeams.shift()
                        console.log(arrayOfTeams)
                      });
                  } else {
                    bot.sendMessage(
                      msg.chat.id,
                      "Ok. Try filling the form again by /InnovativeEdge."
                    );
                    arrayOfTeams.shift();
                    console.log(arrayOfTeams)
                  }
                });
              });
          }
        }
      );
    });
});

function insertIntoDB(msg, arrayOfTeams){
  var id1, leaderName;
  arrayOfTeams.forEach(element => {
    if (msg.chat.id == element.id) {
      leaderName = element.leaderName;
      id1 = element.id1;
      // phone_number = element.phone_number;
    }
  });
  console.log("Name: " + leaderName + "userid: " + userid)
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  client.connect(err => {
    if (err) {
      console.log(err);
      bot.sendMessage(
        msg.chat.id,
        "Something went wrong! Try again"
      );
      return;
    } else {
      console.log("connected!");
    }
  });
  var idIsPresentInDB = false;
  var getAllParticipantIdQuery =
    "Select id from techweek.participant";
  var checkIfAlreadyRegisteredQuery = `select * from techweek.ppevent where ppevent_participant_id= (${userid})`;
  var insertIntoDBQuery =
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
          checkIfAlreadyRegisteredQuery,
          (err, data) => {
            if (err) {
              console.log(err);
              client.end();
            } else {
              var ans = data.rows[0];
              console.log(ans);
              if (ans == undefined) {
                console.log(
                  "Is not in pp database, inserting"
                );
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
                        "You are now registered for Innovative Edge!"
                      );
                    }
                  }
                );
              } else {
                bot.sendMessage(
                  msg.chat.id,
                  "You are already registered for InnovativeEdge!"
                );
                client.end();
              }
            }
          }
        );
      } else {
        bot.sendMessage(
          msg.chat.id,
          "That particular id is not in our database. Kindly /register before choosing your events"
        );
        client.end();
      }
    }
  });
}