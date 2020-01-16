var bot = require("../bot");
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
bot.onText(/^\/CodeQuest/, msg => {
  team = {
    id: "id",
    leaderName: "leaderName",
    teamName: "teamName",
    teamSize: "teamSize",
    id1: "0",
    id2: "0"
  };
  team.id = msg.chat.id;
  team.leaderName = msg.chat.first_name;
  var id1 = 0;
  var id2 = 0;
  var teamId = 0;
  var tname;
  var teamSize;
  var str = "Name: " + msg.chat.first_name;
  bot
    .sendMessage(
      msg.chat.id,
      "Your form has started for CodeQuest! Please enter your team name!",
      {
        reply_markup: JSON.stringify({ force_reply: true })
      }
    )
    .then(sentMessage => {
      bot.onReplyToMessage(
        sentMessage.chat.id,
        sentMessage.message_id,
        reply => {
          if (reply.text == "") {
            console.log("error");
          } else {
            tname = reply.text;
            str += "\nTeam name: " + tname;
            team.teamName = tname;
            console.log(reply.text);
            bot
              .sendMessage(
                msg.chat.id,
                "That's nice! Now let us know your team size (max 2)",
                {
                  reply_markup: JSON.stringify({ force_reply: true })
                }
              )
              .then(sentMessage => {
                bot.onReplyToMessage(
                  sentMessage.chat.id,
                  sentMessage.message_id,
                  reply => {
                    if (
                      parseInt(reply.text) == NaN ||
                      parseInt(reply.text) > 2 ||
                      parseInt(reply.text) <= 0
                    ) {
                      bot.sendMessage(
                        msg.chat.id,
                        "That seems invalid, try again! /CodeQuest"
                      );
                      return;
                    } else if (reply.text == "") {
                      console.log("error");
                    } else {
                      teamSize = parseInt(reply.text);
                      str += "\nTeam Size: " + teamSize;
                      console.log(reply.text);
                      team.teamSize = teamSize;
                      //after entering team size (1/2)
                      //ask for id1...
                      bot
                        .sendMessage(msg.chat.id, "Enter id1", {
                          reply_markup: JSON.stringify({ force_reply: true })
                        })
                        .then(sentMessage => {
                          bot.onReplyToMessage(
                            sentMessage.chat.id,
                            sentMessage.message_id,
                            reply => {
                              if (
                                parseInt(reply.text) == NaN ||
                                reply.text.length != 9
                              ) {
                                bot.sendMessage(
                                  msg.chat.id,
                                  "That seems invalid, Try again /CodeQuest"
                                );
                              } else if (reply.text == "") console.log("error");
                              else {
                                id1 = parseInt(reply.text);
                                str += "\nid1: " + id1;
                                team.id1 = id1;
                                console.log(reply.text);
                                if (teamSize === 1) {
                                  arrayOfTeams.push(team);
                                  bot
                                    .sendMessage(msg.chat.id, "Confirm Details")
                                    .then(() => {
                                      var tn, ln, i1, i2;
                                      arrayOfTeams.forEach(element => {
                                        if (element.id == msg.chat.id) {
                                          tn = element.teamName;
                                          ln = element.leaderName;
                                          i1 = element.id1;
                                          i2 = element.id2;
                                        }
                                      });
                                      bot.sendMessage(
                                        msg.chat.id,
                                        "Team name: " +
                                          tn +
                                          "\nLeader Name: " +
                                          ln +
                                          "\nId1: " +
                                          i1
                                      );
                                    })
                                    .then(() => {
                                      bot
                                        .sendMessage(
                                          msg.chat.id,
                                          "Should I submit this?",
                                          yesno
                                        )
                                        .then(() => {
                                          bot.once("message", answer => {
                                            if (answer.text == "Yes") {
                                              console.log(answer.text);

                                              bot
                                                .sendMessage(
                                                  msg.chat.id,
                                                  "Confirmed! Please wait while I submit your details..."
                                                )
                                                .then(() => {
                                                  // console.log(tname+" "+ m11sg.chat.first_name+" "+teamId+" " + id1+" " + null)
                                                  insertInDatabase(
                                                    msg,
                                                    arrayOfTeams
                                                  );
                                                  arrayOfTeams.shift();
                                                  console.log(arrayOfTeams);
                                                });
                                            } else if (answer.text == "No") {
                                              bot.sendMessage(
                                                msg.chat.id,
                                                "Ok. Try entering the details again /CodeQuest"
                                              );
                                              arrayOfTeams.shift();
                                              console.log(arrayOfTeams);
                                            }
                                          });
                                        });
                                    });
                                } else if (teamSize > 1) {
                                  bot
                                    .sendMessage(msg.chat.id, "Enter id2", {
                                      reply_markup: JSON.stringify({
                                        force_reply: true
                                      })
                                    })
                                    .then(sentMessage => {
                                      bot.onReplyToMessage(
                                        sentMessage.chat.id,
                                        sentMessage.message_id,
                                        reply => {
                                          if (
                                            parseInt(reply.text) == NaN ||
                                            reply.text.length != 9
                                          ) {
                                            bot.sendMessage(
                                              msg.chat.id,
                                              "That seems invalid, Try again"
                                            );
                                          } else if (reply.text == "")
                                            console.log("error");
                                          else {
                                            id2 = parseInt(reply.text);
                                            str += "\nid2: " + id2;
                                            team.id2 = id2;
                                            console.log(reply.text);
                                            if (teamSize === 2) {
                                              arrayOfTeams.push(team);
                                              bot
                                                .sendMessage(
                                                  msg.chat.id,
                                                  "Confirm Details"
                                                )
                                                .then(() => {
                                                  var tn, ln, i1, i2;
                                                  arrayOfTeams.forEach(
                                                    element => {
                                                      if (
                                                        element.id ==
                                                        msg.chat.id
                                                      ) {
                                                        tn = element.teamName;
                                                        ln = element.leaderName;
                                                        i1 = element.id1;
                                                        i2 = element.id2;
                                                      }
                                                    }
                                                  );
                                                  bot.sendMessage(
                                                    msg.chat.id,
                                                    "Team name: " +
                                                      tn +
                                                      "\nLeader Name: " +
                                                      ln +
                                                      "\nId1: " +
                                                      i1 +
                                                      "\nId2: " +
                                                      i2
                                                  );
                                                })
                                                .then(() => {
                                                  bot
                                                    .sendMessage(
                                                      msg.chat.id,
                                                      "Should I submit this?",
                                                      yesno
                                                    )
                                                    .then(() => {
                                                      bot.once(
                                                        "message",
                                                        answer => {
                                                          if (
                                                            answer.text == "Yes"
                                                          ) {
                                                            console.log(
                                                              answer.text
                                                            );

                                                            bot
                                                              .sendMessage(
                                                                msg.chat.id,
                                                                "Confirmed! Please wait while I submit your details..."
                                                              )
                                                              .then(() => {
                                                                insertInDatabase(
                                                                  msg,
                                                                  arrayOfTeams
                                                                );
                                                                arrayOfTeams.shift();
                                                                console.log(
                                                                  arrayOfTeams
                                                                );
                                                              });
                                                          } else {
                                                            bot.sendMessage(
                                                              msg.chat.id,
                                                              "Ok. Try filling the form again by /CodeQuest."
                                                            );
                                                            arrayOfTeams.shift();
                                                            console.log(
                                                              arrayOfTeams
                                                            );
                                                          }
                                                        }
                                                      );
                                                    });
                                                });
                                            }
                                          }
                                        }
                                      );
                                    });
                                }
                              }
                            }
                          );
                        });
                    }
                  }
                );
              });
          }
        }
      );
    });
});

function insertInDatabase(msg, arrayOfTeams) {
  var tname, id1, id2, leaderName;
  arrayOfTeams.forEach(element => {
    if (msg.chat.id == element.id) {
      tname = element.teamName;
      leaderName = element.leaderName;
      id1 = element.id1;
      id2 = element.id2;
      // phone_number = element.phone_number;
    }
  });
  console.log("Team name: " + tname + " id1: " + id1 + " id2: " + id2);
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
  var rowsPresentInDB;
  var alreadyRegisteredTeam = false;
  var oneOfThemAlreadyRegistered = false;
  var neitherHasRegisteredYet = true;
  var ids = [id1, id2];
  var checkIfAlreadyPresentQuery = "select * from techweek.csoffline";
  var createTeamIdQuery =
    "select max(csoffline_team_id) from techweek.csoffline;";
  var insertQuery =
    "INSERT INTO techweek.csoffline(team_name, leader_name, csoffline_team_id, id1, id2) VALUES ($1, $2, $3, $4, $5) returning *";
  client.query(checkIfAlreadyPresentQuery, (err, data) => {
    if (err) {
      console.log(err);
      client.end();
    } else {
      rowsPresentInDB = data.rows;
      rowsPresentInDB.shift();
      rowsPresentInDB.forEach(element => {
        // console.log(element.id1 + " " + element.id2 + " " + element.id3)
        // console.log(element.id1)

        //if not -1, then the id already present in this event's database
        if (
          ids.indexOf(parseInt(element.id1)) != -1 &&
          ids.indexOf(parseInt(element.id2)) != -1
          // ids.indexOf(parseInt(element.id3)) != -1
        ) {
          alreadyRegisteredTeam = true;
        } // client.end();
        else if (
          ids.indexOf(parseInt(element.id1)) != -1 ||
          ids.indexOf(parseInt(element.id2)) != -1
          // ids.indexOf(parseInt(element.id3)) != -1
        ) {
          oneOfThemAlreadyRegistered = true;
        } else {
          neitherHasRegisteredYet = true;
        }
      });
      if (alreadyRegisteredTeam) {
        console.log("Team already registered");
        bot
          .sendMessage(msg.chat.id, "This team is already registered!")
          .then(() => {
            bot.sendMessage(
              msg.chat.id,
              "Check out other events at /eventDetails or go back to /start"
            );
          });
        client.end();
      } else if (oneOfThemAlreadyRegistered) {
        console.log("At least one of them has already registered!");
        bot
          .sendMessage(
            msg.chat.id,
            "One of your teammates have already registered for this event with another team. You can be part of only one team!"
          )
          .then(() => {
            bot.sendMessage(
              msg.chat.id,
              "Try again: /codeQuest or check out other events at /eventDetails or go back to /start"
            );
          });
        client.end();
      } else if (neitherHasRegisteredYet) {
        console.log("neither");
        client.query(createTeamIdQuery, (err, data) => {
          if (err) {
            console.log(err);
            client.end();
          } else {
            console.log(data.rows[0].max);
            teamId = 1 + parseInt(data.rows[0].max);
            console.log("Teamid: " + teamId);
            client.query(
              insertQuery,
              [
                tname,
                leaderName,
                teamId,
                id1 == 0 ? null : id1,
                id2 == 0 ? null : id2
              ],
              (err, data) => {
                if (err) {
                  console.log(err);
                  client.end();
                  bot.sendMessage(
                    msg.chat.id,
                    "Something went wrong! Try again!"
                  );
                } else {
                  console.log("Successful");
                  client.end();
                  bot
                    .sendMessage(
                      msg.chat.id,
                      "You are now registered for CodeQuest!\n" +
                        "Your event participation id is: " +
                        teamId +
                        "\nPlease take a note of it!"
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
          }
        });
        // client.end();
      }
    }
  });
}
