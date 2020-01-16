// var bot = require("../bot");
// const { Client } = require("pg");
// //variables to store user input
// var yesno = {
//   // parse_mode: "Markdown",
//   reply_markup: {
//     one_time_keyboard: true,
//     keyboard: [["Yes"], ["No"]]
//     // }
//   }
// };
// const requestPhoneKeyboard = {
//   reply_markup: {
//     one_time_keyboard: true,
//     keyboard: [
//       [
//         {
//           text: "My phone number",
//           request_contact: true,
//           one_time_keyboard: true
//         }
//       ],
//       ["Cancel"]
//     ]
//   }
// };
// var person = {};
// var arrayOfPeople = [];
// //register command to store user information
// bot.onText(/\/register/, msg => {
//   var alreadyEntered = false;
//   var person = {
//     id: "id",
//     first_name: "first_name",
//     email: "email",
//     outstation: "outstation",
//     // phone_number: "phone_number"
//   };
//   person.id = msg.chat.id;
//   person.first_name = msg.chat.first_name;
//   arrayOfPeople.forEach(element => {
//     if (element.id == msg.chat.id) {
//       console.log("Already entered details");
//       alreadyEntered = true;
//     }
//   });
//   var email;
//   var outstation;
//   // var phone_number;

//   if (alreadyEntered == true) {
//     bot.sendMessage(
//       msg.chat.id,
//       "You've already entered your details.\n" +
//         "View your participation id by /participantDetails"
//     );
//   } else {
//     bot.sendMessage(
//       msg.chat.id,
//       "Got it! Starting your form, " + msg.chat.first_name
//     );
//     bot
//       .sendMessage(msg.chat.id, "Enter email", {
//         reply_markup: JSON.stringify({ force_reply: true })
//       })
//       .then(sentMessage => {
//         bot.onReplyToMessage(
//           sentMessage.chat.id,
//           sentMessage.message_id,
//           reply => {
//             email = reply.text;
//             console.log(reply.text);
//             person.email = reply.text;
//             bot
//               .sendMessage(msg.chat.id, "Enter yes if outstation", {
//                 reply_markup: JSON.stringify({ force_reply: true })
//               })
//               .then(sentMessage => {
//                 bot.onReplyToMessage(
//                   sentMessage.chat.id,
//                   sentMessage.message_id,
//                   reply => {
//                     if (reply.text == "") {
//                       console.log("error");
//                     } else {
//                       outstation = reply.text;
//                       console.log(reply.text);
//                       person.outstation = reply.text;
//                       // bot
//                       //   .sendMessage(
//                       //     msg.chat.id,
//                       //     "Please give us access to your phone number: (necessary)",
//                       //     requestPhoneKeyboard
//                       //   )
//                         // .then(sentMessage => {
//                           // sentMessage.chat.id,
//                           //   sentMessage.message_id,
//                             // bot.once("contact", function(msg, match) {
//                               // var deletemessage = msg.message_id;
//                               // console.log(msg.contact);
//                               // phone_number = msg.contact.phone_number;
//                               // person.phone_number = msg.contact.phone_number;
//                               console.log(person)
//                               arrayOfPeople.push(person);

//                               // bot.deleteMessage(msg.chat.id, deletemessage);
//                               bot
//                                 .sendMessage(
//                                   msg.chat.id,
//                                   "Thanks for entering the form. These are your details."
//                                 )
//                                 .then(() => {
//                                   var n, e, o;
//                                   arrayOfPeople.forEach(element => {
//                                     if (element.id == msg.chat.id) {
//                                       (n = element.first_name),
//                                         (e = element.email);
//                                       // p = element.phone_number;
//                                       o = element.outstation;
//                                     }
//                                   });
//                                   // console.log(n+e+p+o)
//                                   bot.sendMessage(
//                                     msg.chat.id,
//                                     "Name: " +
//                                       n +
//                                       "\nEmail: " +
//                                       e +
//                                       "\nOutstation: " +
//                                       o
//                                       // "\nPhone Number: " +
//                                       // p
//                                   );
//                                 })
//                                 .then(() => {
//                                   bot
//                                     .sendMessage(
//                                       msg.chat.id,
//                                       "Should I submit this?",
//                                       yesno
//                                     )
//                                     .then(() => {
//                                       bot.once("message", answer => {
//                                         if (answer.text == "Yes") {
//                                           bot.sendMessage(
//                                             msg.chat.id,
//                                             "Confirmed! Please wait while I enter your details."
//                                           );
//                                           insertInDatabase(msg, arrayOfPeople);
//                                           arrayOfPeople.shift();
//                                         } else {
//                                           bot.sendMessage(
//                                             msg.chat.id,
//                                             "Ok. Try filling the form again by /register."
//                                           );
//                                           arrayOfPeople.shift();
//                                           console.log(arrayOfPeople);
//                                         }
//                                       });
//                                     });
//                                 });
//                             // });

//                           bot.on("message", msg => {
//                             if (msg.text == "Cancel") {
//                               bot.sendMessage(
//                                 msg.chat.id,
//                                 "Your phone number is necessary! /register again"
//                               );
//                             } else if (msg.text == undefined) {
//                               // bot.deleteMessage(msg.chat.id, )
//                             }
//                           });
//                         // });
//                     }
//                     // }
//                   }
//                 );
//               });
//           }
//         );
//       });
//   }
// });
// exports.getOutstation = () => {
//   return outstation;
// };
// exports.getEmail = () => {
//   return email;
// };
// exports.getPhoneNumber = () => {
//   return phone_number;
// };
// function insertInDatabase(msg, arrayOfPeople) {
//   var first_name;
//   var email;
//   var outstation;
//   var phone_number = 0;
//   arrayOfPeople.forEach(element => {
//     if (msg.chat.id == element.id) {
//       first_name = element.first_name;
//       email = element.email;
//       outstation = element.outstation;
//       // phone_number = element.phone_number;
//     }
//   });
//   console.log("inserting this:");
//   console.log(first_name + email + outstation + phone_number);
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
//   });
//   client.connect(err => {
//     if (err) {
//       console.log(err);
//       bot.sendMessage(msg.chat.id, "Something went wrong! Try again");
//       return;
//     } else {
//       console.log("connected!");
//     }
//   });

//   var isPresentInDB = false;
//   var participant_id = 202046000;
//   const now = new Date();
//   var noOutstation = outstation.toLowerCase() == "yes" ? 1 : 0;
//   const getExistingPhoneNumbersQuery = "Select phone from techweek.participant";
//   const findIdQuery = "Select max(id) from techweek.participant";
//   const insertDataQuery =
//     "INSERT INTO techweek.participant(time, name, email, outstation, phone, id) VALUES ($1, $2, $3, $4, $5, $6) returning *";

//   client.query(getExistingPhoneNumbersQuery, (err, data) => {
//     if (err) {
//       console.log(err);
//       client.end();
//     } else {
//       var phoneNumberListFromDB = data.rows;
//       console.log(phoneNumberListFromDB);
//       phoneNumberListFromDB.forEach(p => {
//         if (p.phone == parseInt(phone_number)) {
//           isPresentInDB = true;
//         }
//       });
//       if (isPresentInDB == true) {
//         bot.sendMessage(
//           msg.chat.id,
//           "You have already registered as a participant!\n" +
//             "Check out our events: /eventDetails"
//         );
//         client.end();
//         return;
//       } else {
//         client.query(findIdQuery, (err, data) => {
//           if (err) {
//             console.log(err);
//             client.end();
//           } else {
//             var count = data.rows[0];
//             participant_id = 1 + parseInt(count.max);
//             client.query(
//               insertDataQuery,
//               [
//                 now,
//                 msg.chat.first_name,
//                 email,
//                 noOutstation,
//                 phone_number,
//                 participant_id
//               ],
//               (err, data) => {
//                 if (err) {
//                   console.log(err);
//                   client.end();
//                   bot.sendMessage(
//                     msg.chat.id,
//                     "Something went wrong! Try again"
//                   );
//                 } else {
//                   console.log("Successful!");
//                   client.end();
//                   bot.sendMessage(
//                     msg.chat.id,
//                     "You have successfully registered!\n" +
//                       "Check out our events: /eventDetails"
//                   );
//                 }
//               }
//             );
//           }
//         });
//       }
//     }
//   });
// }
