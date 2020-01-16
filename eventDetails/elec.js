var bot = require("../bot");
//Describe Electronic Events
bot.onText(/\/electronics/, msg => {
  bot.sendMessage(msg.chat.id, "Electronics Events: \n\n"+
  "1. Black Flag – Bring your robot ship and navigate through unchartered territory. Prove your mettle in elimination battles and speed rounds."+
  "\n2. Scientia – A workshop on Arduino with hands on learning and interactive sessions. Build your basics and sharpen your skills in microcontrollers." +
  "\n\nTo register: \n"+
  "1. /blackFlag"+
  "\n2. /Scientia")
});
