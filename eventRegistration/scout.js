var bot = require("../bot");
const { Client } = require("pg");
var tname;
var teamSize;
var id1 = 0;
var id2 = 0;
var id3 = 0;
var id4 = 0;
var id5 = 0;
var yesno = {
  // parse_mode: "Markdown",
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [["Yes"], ["No"]]
    // }
  }
};
bot.onText(/\/ScoutAbout/, msg => {
  var str = "Name: " + msg.chat.first_name;
  bot
    .sendMessage(msg.chat.id, "Hello There, Please enter a team name!", {
      reply_markup: JSON.stringify({ force_reply: true })
    })
    .then(sentMessage => {
      bot.onReplyToMessage(
        sentMessage.chat.id,
        sentMessage.message_id,
        reply => {
          if (reply.text == "") {
            // enterEmail(msg.;
            console.log("error");
          } else {
            tname = reply.text;
            str += "\nTeam name: " + tname;
            console.log(reply.text);
            bot
              .sendMessage(
                msg.chat.id,
                "That's nice! Now let us know your team size (3 to 5)",
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
                      parseInt(reply.text) < 3 ||
                      parseInt(reply.text) > 5
                    ) {
                      bot.sendMessage(
                        msg.chat.id,
                        "That seems invalid, try again! /ScoutAbout"
                      );
                    } else if (reply.text == "") {
                      console.log("error");
                    } else {
                      teamSize = parseInt(reply.text);
                      str += "\nTeam Size: " + teamSize;
                      console.log(reply.text);

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
                                  "That seems invalid, Try again /ScoutAbout"
                                );
                              } else if (reply.text == "") console.log("error");
                              else {
                                id1 = parseInt(reply.text);
                                str += "\nid1: " + id1;
                                console.log(reply.text);
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

                                          bot
                                            .sendMessage(
                                              msg.chat.id,
                                              "Enter id3",
                                              {
                                                reply_markup: JSON.stringify({
                                                  force_reply: true
                                                })
                                              }
                                            )
                                            .then(sentMessage => {
                                              bot.onReplyToMessage(
                                                sentMessage.chat.id,
                                                sentMessage.message_id,
                                                reply => {
                                                  if (
                                                    parseInt(reply.text) == NaN
                                                  ) {
                                                    bot.sendMessage(
                                                      msg.chat.id,
                                                      "That seems invalid, Try again"
                                                    );
                                                  } else if (reply.text == "")
                                                    console.log("error");
                                                  else {
                                                    id3 = parseInt(reply.text);
                                                    str += "\nid3: " + id3;
                                                    console.log(reply.text);
                                                    if (teamSize === 3) {
                                                      bot
                                                        .sendMessage(
                                                          msg.chat.id,
                                                          "confirm details"
                                                        )
                                                        .then(() =>
                                                          bot.sendMessage(
                                                            msg.chat.id,
                                                            str
                                                          )
                                                        )
                                                        .then(() => {
                                                          bot
                                                            .sendMessage(
                                                              msg.chat.id,
                                                              "Should I submit this? ",
                                                              yesno
                                                            )
                                                            .then(() => {
                                                              bot.once(
                                                                "message",
                                                                answer => {
                                                                  if (
                                                                    answer.text ==
                                                                    "Yes"
                                                                  ) {
                                                                    bot
                                                                      .sendMessage(
                                                                        msg.chat
                                                                          .id,
                                                                        "Confirmed! Please wait while I enter your details"
                                                                      )
                                                                      .then(
                                                                        () =>
                                                                          insertInDatabase(
                                                                            msg,
                                                                            tname,
                                                                            id1,
                                                                            id2,
                                                                            id3,
                                                                            id4,
                                                                            id5
                                                                          )
                                                                      );
                                                                  } else {
                                                                    bot.sendMessage(
                                                                      msg.chat
                                                                        .id,
                                                                      "Ok. Try filling the form again by /blackFlag."
                                                                    );
                                                                  }
                                                                }
                                                              );
                                                            });
                                                        });
                                                    } else if (teamSize > 3) {
                                                      bot
                                                        .sendMessage(
                                                          msg.chat.id,
                                                          "Enter id4",
                                                          {
                                                            reply_markup: JSON.stringify(
                                                              {
                                                                force_reply: true
                                                              }
                                                            )
                                                          }
                                                        )
                                                        .then(sentMessage => {
                                                          bot.onReplyToMessage(
                                                            sentMessage.chat.id,
                                                            sentMessage.message_id,
                                                            reply => {
                                                              if (
                                                                parseInt(
                                                                  reply.text
                                                                ) == NaN
                                                              ) {
                                                                bot.sendMessage(
                                                                  msg.chat.id,
                                                                  "That seems invalid, Try again"
                                                                );
                                                              } else if (
                                                                reply.text == ""
                                                              )
                                                                console.log(
                                                                  "error"
                                                                );
                                                              else {
                                                                id4 = parseInt(
                                                                  reply.text
                                                                );
                                                                str +=
                                                                  "\nid4: " +
                                                                  id4;
                                                                if (
                                                                  teamSize === 4
                                                                ) {
                                                                  bot
                                                                    .sendMessage(
                                                                      msg.chat
                                                                        .id,
                                                                      "confirm details"
                                                                    )
                                                                    .then(() =>
                                                                      bot.sendMessage(
                                                                        msg.chat
                                                                          .id,
                                                                        str
                                                                      )
                                                                    ).then(() => {
                                                                      bot
                                                                        .sendMessage(
                                                                          msg.chat.id,
                                                                          "Should I submit this? ",
                                                                          yesno
                                                                        )
                                                                        .then(() => {
                                                                          bot.once("message", answer => {
                                                                            if (answer.text == "Yes") {
                                                                              bot
                                                                                .sendMessage(
                                                                                  msg.chat.id,
                                                                                  "Confirmed! Please wait while I enter your details"
                                                                                )
                                                                                .then(() =>
                                                                                  insertInDatabase(
                                                                                    msg,
                                                                                    tname,
                                                                                    id1,
                                                                                    id2,
                                                                                    id3,
                                                                                    id4,
                                                                                    id5
                                                                                  )
                                                                                );
                                                                            } else {
                                                                              bot.sendMessage(
                                                                                msg.chat.id,
                                                                                "Ok. Try filling the form again by /blackFlag."
                                                                              );
                                                                            }
                                                                          });
                                                                        });
                                                                    });
                                                                } else if (
                                                                  teamSize === 5
                                                                ) {
                                                                  bot
                                                                    .sendMessage(
                                                                      msg.chat
                                                                        .id,
                                                                      "Enter id4",
                                                                      {
                                                                        reply_markup: JSON.stringify(
                                                                          {
                                                                            force_reply: true
                                                                          }
                                                                        )
                                                                      }
                                                                    )
                                                                    .then(
                                                                      sentMessage => {
                                                                        bot.onReplyToMessage(
                                                                          sentMessage
                                                                            .chat
                                                                            .id,
                                                                          sentMessage.message_id,
                                                                          reply => {
                                                                            if (
                                                                              parseInt(
                                                                                reply.text
                                                                              ) ==
                                                                              NaN
                                                                            ) {
                                                                              bot.sendMessage(
                                                                                msg
                                                                                  .chat
                                                                                  .id,
                                                                                "That seems invalid, Try again! /ScoutAbout"
                                                                              );
                                                                            } else if (
                                                                              reply.text ==
                                                                              ""
                                                                            )
                                                                              console.log(
                                                                                error
                                                                              );
                                                                            else {
                                                                              id5 = parseInt(
                                                                                reply.text
                                                                              );
                                                                              str +=
                                                                                "id5: " +
                                                                                id5;
                                                                              bot
                                                                                .sendMessage(
                                                                                  msg
                                                                                    .chat
                                                                                    .id,
                                                                                  "confirm details"
                                                                                )
                                                                                .then(
                                                                                  () =>
                                                                                    bot.sendMessage(
                                                                                      msg
                                                                                        .chat
                                                                                        .id,
                                                                                      str
                                                                                    )
                                                                                ).then(() => {
                                                                                  bot
                                                                                    .sendMessage(
                                                                                      msg.chat.id,
                                                                                      "Should I submit this? ",
                                                                                      yesno
                                                                                    )
                                                                                    .then(() => {
                                                                                      bot.once("message", answer => {
                                                                                        if (answer.text == "Yes") {
                                                                                          bot
                                                                                            .sendMessage(
                                                                                              msg.chat.id,
                                                                                              "Confirmed! Please wait while I enter your details"
                                                                                            )
                                                                                            .then(() =>
                                                                                              insertInDatabase(
                                                                                                msg,
                                                                                                tname,
                                                                                                id1,
                                                                                                id2,
                                                                                                id3,
                                                                                                id4,
                                                                                                id5
                                                                                              )
                                                                                            );
                                                                                        } else {
                                                                                          bot.sendMessage(
                                                                                            msg.chat.id,
                                                                                            "Ok. Try filling the form again by /blackFlag."
                                                                                          );
                                                                                        }
                                                                                      });
                                                                                    });
                                                                                });
                                                                            }
                                                                          }
                                                                        );
                                                                      }
                                                                    );
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
                    }
                  }
                );
              });
          }
        }
      );
    });
});

function insertInDatabase(msg, tname, id1, id2, id3, id4, id5) {
  console.log(
    "Team name: " +
      tname +
      " id1: " +
      id1 +
      " id2: " +
      id2 +
      " id3: " +
      id3 +
      "id4: " +
      id4 +
      "id5: " +
      id5
  );
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
  var createTeamIdQuery = "select count(*) from techweek.treasurehunt;";
  var insertQuery =
    "insert into techweek.treasurehunt (team_name, leader_name, treasurehunt_team_id, id1, id2, id3, id4, id5) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *";
  client.query(createTeamIdQuery, (err, data) => {
    if (err) {
      console.log(err);
      client.end();
    } else {
      console.log(data.rows[0].count);
      teamId = 24000 + parseInt(data.rows[0].count);
      console.log("Teamid: " + teamId);
      client.query(
        insertQuery,
        [
          tname,
          msg.chat.first_name,
          teamId,
          id1 == 0 ? null : id1,
          id2 == 0 ? null : id2,
          id3 == 0 ? null : id3,
          id4 == 0 ? null : id4,
          id5 == 0 ? null : id5
        ],
        (err, data) => {
          if (err) {
            console.log(err);
            client.end();
            bot.sendMessage(msg.chat.id, "Something went wrong! Try again!");
          } else {
            console.log("Successful");
            client.end();
            bot.sendMessage(
              msg.chat.id,
              "You are now registered for ScoutAbout!"
            );
          }
        }
      );
    }
  });
}
