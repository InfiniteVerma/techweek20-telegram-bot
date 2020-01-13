var bot = require("../bot");
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
