var bot = require("../bot");
const { Client } = require("pg");
var tname;
var id1 = 0;
var id2 = 0;
var id3 = 0;
var id4 = 0;
var teamId;
var firstName;
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
bot.onText(/\/hackathon/, msg => {
  team = {
    id: "id",
    leaderName: "leaderName",
    teamName: "teamName",
    teamSize: "teamSize",
    id1: "0",
    id2: "0",
    id3: "0",
    id4: "0"
  };
  team.id = msg.chat.id;
  team.leaderName = msg.chat.first_name;
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
            team.teamName = tname;
            console.log(reply.text);
            bot
              .sendMessage(
                msg.chat.id,
                "That's nice! Now let us know your team size (max 4)",
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
                      parseInt(reply.text) > 4 ||
                      parseInt(reply.text) <= 0
                    ) {
                      bot.sendMessage(
                        msg.chat.id,
                        "That seems invalid, try again! /hackathon"
                      );
                    } else if (reply.text == "") {
                      console.log("error");
                    } else {
                      size = parseInt(reply.text);
                      str += "\nTeam Size: " + size;
                      console.log(reply.text);
                      team.teamSize = size;
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
                                  "That seems invalid, Try again /hackathon"
                                );
                              } else if (reply.text == "") console.log("error");
                              else {
                                id1 = parseInt(reply.text);
                                str += "\nid1: " + id1;
                                team.id1 = id1;
                                console.log(reply.text);
                                if (size === 1) {
                                  arrayOfTeams.push(team);
                                  bot
                                    .sendMessage(msg.chat.id, "Confirm Details")
                                    // .then(() =>
                                      // bot
                                        // .sendMessage(msg.chat.id, str)
                                        .then(() => {
                                          var tn, ln, i1, i2, i3, i4;
                                          arrayOfTeams.forEach(element => {
                                            if (element.id == msg.chat.id) {
                                              tn = element.teamName;
                                              ln = element.leaderName;
                                              i1 = element.id1;
                                              i2 = element.id2;
                                              i3 = element.id3;
                                              i4 = element.id4;
                                            }
                                          });
                                          bot.sendMessage(
                                            msg.chat.id,
                                            tn + ln + i1 + i2 + i3 + i4
                                          );
                                        })
                                        .then(() => {
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
                                                    .then(() => {
                                                      insertInDatabase(
                                                        msg,
                                                        arrayOfTeams
                                                      );
                                                      arrayOfTeams.shift();
                                                      console.log(arrayOfTeams);
                                                    });
                                                } else {
                                                  bot.sendMessage(
                                                    msg.chat.id,
                                                    "Ok. Try filling the form again by /hackathon."
                                                  );
                                                  arrayOfTeams.shift();
                                                  console.log(arrayOfTeams);
                                                }
                                              });
                                            });
                                        }
                                        // )
                                    );
                                } else if (size > 1) {
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
                                            console.log(reply.text);
                                            team.id2 = id2;
                                            if (size === 2) {
                                              arrayOfTeams.push(team);
                                              bot
                                                .sendMessage(
                                                  msg.chat.id,
                                                  "Confirm Details"
                                                )
                                                .then(() => {
                                                  var tn, ln, i1, i2, i3, i4;
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
                                                        i3 = element.id3;
                                                        i4 = element.id4;
                                                      }
                                                    }
                                                  );
                                                  bot
                                                    .sendMessage(
                                                      msg.chat.id,
                                                      tn +
                                                        ln +
                                                        i1 +
                                                        i2 +
                                                        i3 +
                                                        i4
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
                                                                    msg.chat.id,
                                                                    "Confirmed! Please wait while I enter your details"
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
                                                                  "Ok. Try filling the form again by /hackathon."
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
                                                });
                                            } else if (size > 2) {
                                              bot
                                                .sendMessage(
                                                  msg.chat.id,
                                                  "Enter id3",
                                                  {
                                                    reply_markup: JSON.stringify(
                                                      { force_reply: true }
                                                    )
                                                  }
                                                )
                                                .then(sentMessage => {
                                                  bot.onReplyToMessage(
                                                    sentMessage.chat.id,
                                                    sentMessage.message_id,
                                                    reply => {
                                                      if (
                                                        parseInt(reply.text) ==
                                                          NaN ||
                                                        reply.text.length != 9
                                                      ) {
                                                        bot.sendMessage(
                                                          msg.chat.id,
                                                          "That seems invalid, Try again"
                                                        );
                                                      } else if (
                                                        reply.text == ""
                                                      )
                                                        console.log("error");
                                                      else {
                                                        id3 = parseInt(
                                                          reply.text
                                                        );
                                                        str += "\nid3: " + id3;
                                                        console.log(reply.text);
                                                        team.id3 = reply.text;
                                                        if (size === 3) {
                                                          arrayOfTeams.push(
                                                            team
                                                          );
                                                          bot
                                                            .sendMessage(
                                                              msg.chat.id,
                                                              "Confirm Details"
                                                            )
                                                            .then(() => {
                                                              var tn,
                                                                ln,
                                                                i1,
                                                                i2,
                                                                i3,
                                                                i4;
                                                              arrayOfTeams.forEach(
                                                                element => {
                                                                  if (
                                                                    element.id ==
                                                                    msg.chat.id
                                                                  ) {
                                                                    tn =
                                                                      element.teamName;
                                                                    ln =
                                                                      element.leaderName;
                                                                    i1 =
                                                                      element.id1;
                                                                    i2 =
                                                                      element.id2;
                                                                    i3 =
                                                                      element.id3;
                                                                    i4 =
                                                                      element.id4;
                                                                  }
                                                                }
                                                              );
                                                              bot
                                                                .sendMessage(
                                                                  msg.chat.id,
                                                                  tn +
                                                                    ln +
                                                                    i1 +
                                                                    i2 +
                                                                    i3 +
                                                                    i4
                                                                )
                                                                .then(() => {
                                                                  bot
                                                                    .sendMessage(
                                                                      msg.chat
                                                                        .id,
                                                                      "Should I submit this? ",
                                                                      yesno
                                                                    )
                                                                    .then(
                                                                      () => {
                                                                        bot.once(
                                                                          "message",
                                                                          answer => {
                                                                            if (
                                                                              answer.text ==
                                                                              "Yes"
                                                                            ) {
                                                                              bot.sendMessage(
                                                                                msg
                                                                                  .chat
                                                                                  .id,
                                                                                "Confirmed! Please wait while I enter your details"
                                                                              );
                                                                              insertInDatabase(
                                                                                msg,
                                                                                arrayOfTeams
                                                                              );
                                                                              arrayOfTeams.shift();
                                                                              console.log(
                                                                                arrayOfTeams
                                                                              );
                                                                            } else {
                                                                              bot.sendMessage(
                                                                                msg
                                                                                  .chat
                                                                                  .id,
                                                                                "Ok. Try filling the form again by /hackathon."
                                                                              );
                                                                              arrayOfTeams.shift();
                                                                              console.log(
                                                                                arrayOfTeams
                                                                              );
                                                                            }
                                                                          }
                                                                        );
                                                                      }
                                                                    );
                                                                });
                                                            });
                                                        } else if (size === 4) {
                                                          arrayOfTeams.push(
                                                            team
                                                          );
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
                                                            .then(
                                                              sentMessage => {
                                                                bot.onReplyToMessage(
                                                                  sentMessage
                                                                    .chat.id,
                                                                  sentMessage.message_id,
                                                                  reply => {
                                                                    if (
                                                                      parseInt(
                                                                        reply.text
                                                                      ) ==
                                                                        NaN ||
                                                                      reply.text
                                                                        .length !=
                                                                        9
                                                                    ) {
                                                                      bot.sendMessage(
                                                                        msg.chat
                                                                          .id,
                                                                        "That seems invalid, Try again"
                                                                      );
                                                                    } else if (
                                                                      reply.text ==
                                                                      ""
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
                                                                      team.id4 = id4;
                                                                      bot
                                                                        .sendMessage(
                                                                          msg
                                                                            .chat
                                                                            .id,
                                                                          "Confirm Details"
                                                                        )
                                                                        .then(
                                                                          () => {
                                                                            var tn,
                                                                              ln,
                                                                              i1,
                                                                              i2,
                                                                              i3,
                                                                              i4;
                                                                            arrayOfTeams.forEach(
                                                                              element => {
                                                                                if (
                                                                                  element.id ==
                                                                                  msg
                                                                                    .chat
                                                                                    .id
                                                                                ) {
                                                                                  tn =
                                                                                    element.teamName;
                                                                                  ln =
                                                                                    element.leaderName;
                                                                                  i1 =
                                                                                    element.id1;
                                                                                  i2 =
                                                                                    element.id2;
                                                                                  i3 =
                                                                                    element.id3;
                                                                                  i4 =
                                                                                    element.id4;
                                                                                }
                                                                              }
                                                                            );
                                                                            bot
                                                                              .sendMessage(
                                                                                msg
                                                                                  .chat
                                                                                  .id,
                                                                                tn +
                                                                                  ln +
                                                                                  i1 +
                                                                                  i2 +
                                                                                  i3 +
                                                                                  i4
                                                                              )
                                                                              .then(
                                                                                () => {
                                                                                  bot
                                                                                    .sendMessage(
                                                                                      msg
                                                                                        .chat
                                                                                        .id,
                                                                                      "Should I submit this? ",
                                                                                      yesno
                                                                                    )
                                                                                    .then(
                                                                                      () => {
                                                                                        bot.once(
                                                                                          "message",
                                                                                          answer => {
                                                                                            if (
                                                                                              answer.text ==
                                                                                              "Yes"
                                                                                            ) {
                                                                                              bot.sendMessage(
                                                                                                msg
                                                                                                  .chat
                                                                                                  .id,
                                                                                                "Confirmed! Please wait while I enter your details"
                                                                                              );
                                                                                              insertInDatabase(
                                                                                                msg,
                                                                                                arrayOfTeams
                                                                                              );
                                                                                              arrayOfTeams.shift();
                                                                                              console.log(
                                                                                                arrayOfTeams
                                                                                              );
                                                                                            } else {
                                                                                              bot.sendMessage(
                                                                                                msg
                                                                                                  .chat
                                                                                                  .id,
                                                                                                "Ok. Try filling the form again by /hackathon."
                                                                                              );
                                                                                              arrayOfTeams.shift();
                                                                                              console.log(
                                                                                                arrayOfTeams
                                                                                              );
                                                                                            }
                                                                                          }
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                }
                                                                              );
                                                                          }
                                                                        );
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
  var tname, id1, id2, id3, id4, leaderName;
  arrayOfTeams.forEach(element => {
    if (msg.chat.id == element.id) {
      tname = element.teamName;
      leaderName = element.leaderName;
      id1 = element.id1;
      id2 = element.id2;
      id3 = element.id3;
      id4 = element.id4;
      // phone_number = element.phone_number;
    }
  });
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
      id4
  );
  var rowsPresentInDB;
  var alreadyRegisteredTeam = false;
  var oneOfThemAlreadyRegistered = false;
  var neitherHasRegisteredYet = true;
  var ids = [id1, id2, id3, id4];
  var checkIfAlreadyPresentQuery = "select * from techweek.hackathon";
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
  var createTeamIdQuery = "select count(*) from techweek.hackathon;";
  var insertQuery =
    "insert into techweek.hackathon (team_name, leader_name, team_id, id1, id2, id3, id4) values ($1, $2, $3, $4, $5, $6, $7) returning *";
  client.query(checkIfAlreadyPresentQuery, (err, data) => {
    if (err) {
      console.log(err);
      client.end();
    } else {
      // console.log(data.rows);
      rowsPresentInDB = data.rows;
      rowsPresentInDB.shift();
      // console.log(ids)
      // console.log(rowsPresentInDB)
      rowsPresentInDB.forEach(element => {
        // console.log(element.id1 + " " + element.id2 + " " + element.id3)
        // console.log(element.id1)

        //if not -1, then the id already present in this event's database
        if (
          ids.indexOf(parseInt(element.id1)) != -1 &&
          ids.indexOf(parseInt(element.id2)) != -1 &&
          ids.indexOf(parseInt(element.id3)) != -1 &&
          ids.indexOf(parseInt(element.id4)) != -1
        ) {
          alreadyRegisteredTeam = true;
        } // client.end();
        else if (
          ids.indexOf(parseInt(element.id1)) != -1 ||
          ids.indexOf(parseInt(element.id2)) != -1 ||
          ids.indexOf(parseInt(element.id3)) != -1 ||
          ids.indexOf(parseInt(element.id4)) != -1
        ) {
          oneOfThemAlreadyRegistered = true;
        } else {
          neitherHasRegisteredYet = true;
        }
      });
      if (alreadyRegisteredTeam) {
        console.log("Team already registered");
        bot.sendMessage(msg.chat.id, "This team is already registered!");
        client.end();
      } else if (oneOfThemAlreadyRegistered) {
        console.log("At least one of them has already registered!");
        bot.sendMessage(
          msg.chat.id,
          "One of your teammates have already registered for this event with another team. You can be part of only one team!"
        );
        client.end();
      } else if (neitherHasRegisteredYet) {
        client.query(createTeamIdQuery, (err, data) => {
          if (err) {
            console.log(err);
            client.end();
          } else {
            console.log(data.rows[0].count);
            teamId = 26000 + parseInt(data.rows[0].count);
            console.log("Teamid: " + teamId);
            client.query(
              insertQuery,
              [
                tname,
                leaderName,
                teamId,
                id1 == 0 ? null : id1,
                id2 == 0 ? null : id2,
                id3 == 0 ? null : id3,
                id4 == 0 ? null : id4
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
                  bot.sendMessage(
                    msg.chat.id,
                    "You are now registered for Hackathon!"
                  );
                }
              }
            );
          }
        });
      }
    }
  });
}
