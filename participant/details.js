var bot = require("../bot");
var info = require("./participantRegistration");
const { Client } = require("pg");
//details command shows user information stored
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
var email;
bot.onText(/\/partDetails/, msg => {
  bot
    .sendMessage(msg.chat.id, "Enter email", {
      reply_markup: JSON.stringify({ force_reply: true })
    })
    .then(sentMessage => {
      bot.onReplyToMessage(
        sentMessage.chat.id,
        sentMessage.message_id,
        reply => {
          console.log(reply.text);
          email = reply.text;
          bot.sendMessage(
            msg.chat.id,
            "Please wait while we check out database"
          );
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
          const queryString = `select * from techweek.participant where email='${email}'`;
          client.query(queryString, (err, data) => {
            if (err) {
              console.log(err);
              client.end();
            } else {
              var details = data.rows[0];
              if (details == undefined) {
                bot.sendMessage(
                  msg.chat.id,
                  "There is no entry associated with the email: " + email
                );
                client.end();
              } else {
                console.log(details.name);
                console.log(details.email);
                console.log(details.outstation);
                console.log(details.phone);
                console.log(details.id);
                console.log(details.collegename)
                var outstation = parseInt(details.outstation)==0?'No':'Yes'
                bot.sendMessage(
                  msg.chat.id,
                  "These are your details: \n" +
                    "Name: " +
                    details.name +
                    "\nEmail: " +
                    details.email +
                    "\nOutstation: " +
                    outstation +
                    "\nParticipation id: " +
                    details.id +
                    "\nCollege: " +
                    details.collegename
                );
                client.end();
              }
            }
          });
        }
      );
    });
});
