var bot = require("../bot");
var info = require("./participantRegistration");
const { Client } = require("pg");

bot.onText(/\/submitForm/, msg => {
  //retrieve the variables
  email = info.getEmail();
  phone_number = info.getPhoneNumber();
  outstation = info.getOutstation();

  //if user hasn't submitted the details
  if (
    email == undefined ||
    outstation == undefined ||
    phone_number == undefined
  ) {
    // console.log(phone_number)
    console.log("Empty!");
    bot.sendMessage(msg.chat.id, "Haven't entered email or outstation or phone Number. Use /register command first!");
    return;
  }

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
  var isPresentInDB = false;
  var participant_id=202046000;
  const now = new Date();
  var noOutstation = outstation.toLowerCase() == "yes" ? 1 : 0;
  const getExistingPhoneNumbersQuery = "Select phone from techweek.participant";
  const findIdQuery = "Select count(*) from techweek.participant";
  const insertDataQuery =
    "INSERT INTO techweek.participant(time, name, email, outstation, phone, id) VALUES ($1, $2, $3, $4, $5, $6) returning *";

  client.query(getExistingPhoneNumbersQuery, (err, data) => {
    if (err) {
      console.log(err);
      client.end();
    } else {
      var phoneNumberListFromDB = data.rows;
      console.log(phoneNumberListFromDB);
      phoneNumberListFromDB.forEach(p => {
        if (p.phone == parseInt(phone_number)) {
          isPresentInDB = true;
        }
      });
      if (isPresentInDB == true) {
        bot.sendMessage(
          msg.chat.id,
          "You have already registered as a participant!"
        );
        client.end();
        return;
      }else{
      client.query(findIdQuery, (err, data) => {
        if (err) {
          console.log(err);
          client.end();
        } else {
          var count = data.rows[0];
          participant_id = 202046000 + parseInt(count.count);
          client.query(
            insertDataQuery,
            [
              now,
              msg.chat.first_name,
              email,
              noOutstation,
              phone_number,
              participant_id
            ],
            (err, data) => {
              if (err) {
                console.log(err);
                client.end();
                bot.sendMessage(msg.chat.id, "Something went wrong! Try again");
              } else {
                console.log("Successful!");
                client.end();
                bot.sendMessage(msg.chat.id, "Entry added in database!");
              }
            }
          );
        }
      });}
    }
  });
});
