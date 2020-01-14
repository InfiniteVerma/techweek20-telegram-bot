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
bot.onText(/^\/CodeQuest/, msg => {
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
                      parseInt(reply.text) > 2
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
                              if (parseInt(reply.text) == NaN) {
                                bot.sendMessage(
                                  msg.chat.id,
                                  "That seems invalid, Try again /CodeQuest"
                                );
                              } else if (reply.text == "") console.log("error");
                              else {
                                id1 = parseInt(reply.text);
                                str += "\nid1: " + id1;
                                console.log(reply.text);
                                if (teamSize === 1) {
                                  bot
                                    .sendMessage(msg.chat.id, "Confirm Details")
                                    .then(() =>
                                      bot.sendMessage(msg.chat.id, str)
                                    )
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
                                              outstation = answer.text;
                                              bot
                                                .sendMessage(
                                                  msg.chat.id,
                                                  "Confirmed! Please wait while i submit your details"
                                                )
                                                .then(() => {
                                                  // console.log(tname+" "+ msg.chat.first_name+" "+teamId+" " + id1+" " + null)
                                                  const client = new Client({
                                                    connectionString:
                                                      process.env.DATABASE_URL,
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
                                                  //here
                                                  var createTeamIdQuery =
                                                    "select count(*) from techweek.csoffline;";
                                                  var insertQuery =
                                                    "INSERT INTO techweek.csoffline(team_name, leader_name, csoffline_team_id, id1, id2) VALUES ($1, $2, $3, $4, $5) returning *";
                                                  client.query(
                                                    createTeamIdQuery,
                                                    (err, data) => {
                                                      if (err) {
                                                        console.log(err);
                                                        client.end();
                                                      } else {
                                                        console.log(
                                                          data.rows[0].count
                                                        );
                                                        teamId =
                                                          20000 +
                                                          parseInt(
                                                            data.rows[0].count
                                                          );
                                                        console.log(
                                                          "Teamid: " + teamId
                                                        );
                                                        client.query(
                                                          insertQuery,
                                                          [
                                                            tname,
                                                            msg.chat.first_name,
                                                            teamId,
                                                            id1,
                                                            null
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
                                                              console.log(
                                                                "Successful"
                                                              );
                                                              client.end();
                                                              bot.sendMessage(
                                                                msg.chat.id,
                                                                "You are now registered for CodeQuest!"
                                                              );
                                                            }
                                                          }
                                                        );
                                                      }
                                                    }
                                                  );
                                                });
                                            } else if (answer.text == "No") {
                                              bot.sendMessage(
                                                msg.chat.id,
                                                "Ok. Try entering the details again /CodeQuest"
                                              );
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
                                          if (parseInt(reply.text) == NaN) {
                                            bot.sendMessage(
                                              msg.chat.id,
                                              "That seems invalid, Try again"
                                            );
                                          } else if (reply.text == "")
                                            console.log("error");
                                          else {
                                            id2 = parseInt(reply.text);
                                            str += "\nid2: " + id2;
                                            console.log(reply.text);
                                            if (teamSize === 2) {
                                              bot
                                                .sendMessage(
                                                  msg.chat.id,
                                                  "Confirm Details"
                                                )
                                                .then(() => {
                                                  // console.log(tname+" "+ msg.chat.first_name+" "+teamId+" " + id1+" " + null)
                                                  const client = new Client({
                                                    connectionString:
                                                      process.env.DATABASE_URL,
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
                                                  //here
                                                  var createTeamIdQuery =
                                                    "select count(*) from techweek.csoffline;";
                                                  var insertQuery =
                                                    "INSERT INTO techweek.csoffline(team_name, leader_name, csoffline_team_id, id1, id2) VALUES ($1, $2, $3, $4, $5) returning *";
                                                  client.query(
                                                    createTeamIdQuery,
                                                    (err, data) => {
                                                      if (err) {
                                                        console.log(err);
                                                        client.end();
                                                      } else {
                                                        console.log(
                                                          data.rows[0].count
                                                        );
                                                        teamId =
                                                          20000 +
                                                          parseInt(
                                                            data.rows[0].count
                                                          );
                                                        console.log(
                                                          "Teamid: " + teamId
                                                        );
                                                        client.query(
                                                          insertQuery,
                                                          [
                                                            tname,
                                                            msg.chat.first_name,
                                                            teamId,
                                                            id1,
                                                            id2
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
                                                              console.log(
                                                                "Successful"
                                                              );
                                                              client.end();
                                                              bot.sendMessage(
                                                                msg.chat.id,
                                                                "You are now registered for CodeQuest!"
                                                              );
                                                            }
                                                          }
                                                        );
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