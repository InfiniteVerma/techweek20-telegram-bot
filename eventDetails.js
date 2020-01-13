var bot = require('./bot')
/*
  Displays all events and commands for each event
*/
bot.onText(/\/eventDetails/, msg => {
    bot
      .sendMessage(
        msg.chat.id,
        "These are our events, " +
          msg.chat.first_name +
          "\n" +
          "\nCS: Offline and online" +
          "\nElectronics: Workshop and Competition" +
          "\nPaper Presentation" +
          "\nHackathon" +
          "\nInformal Events"
      )
      .then(() => {
        bot.sendMessage(
          msg.chat.id,
          "To know more about any event, use these commands: " +
            "\nComputer Science: /cs" +
            "\nElectronics: /elec" +
            "\nInformals: /info" +
            "\nPaper Presentation: /pp" +
            "\nHackathon: /hack"
        );
      });
  });
  
  //Describe CS Events
  bot.onText(/\/cs/, msg => {
    bot.sendMessage(msg.chat.id, "Computer Science Event Descriptions...");
  });
  //Describe Electronic Events
  bot.onText(/\/elec/, msg => {
    bot.sendMessage(msg.chat.id, "Electronic Event Descriptions...");
  });
  //Describe Informal events
  bot.onText(/\/info/, msg => {
    bot.sendMessage(msg.chat.id, "Informal Event Descriptions...");
  });
  //Describe the paper presentation event
  bot.onText(/\/pp/, msg => {
    bot.sendMessage(msg.chat.id, "Paper Presentation Event Descriptions...");
  });
  //Describe the hackathon
  bot.onText(/\/hack/, msg => {
    bot.sendMessage(msg.chat.id, "Hackathon Event Descriptions...");
  });