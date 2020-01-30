var bot = require("../bot");
//Describe the hackathon
bot.onText(/\/hackDetails/, msg => {
  bot.sendMessage(msg.chat.id, "Hackathon Event:\n\n"+
  "Hackathon – A 20 hour Hackathon based on the theme of ‘safety, security and surveillance’. Innovate, build and validate your idea in one go.\n"+
  "To view all problem statements among other details, view the brochure given below\n"+
  "\nTo Register: /hackathon").then(()=>{
    bot.sendDocument(msg.chat.id, './iamges/hack4cause.pdf')
  })
});