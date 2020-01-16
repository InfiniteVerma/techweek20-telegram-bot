var bot = require("../bot");
/*
  Displays all events and commands for each event
*/
bot.onText(/\/eventDetails/, msg => {
  bot
    .sendMessage(
      msg.chat.id,
      "These are our events in brief, " +
        msg.chat.first_name +
        "\n" +
        "\n1. CS: Offline and Online" +
        "\n2. Electronics: Workshop and Competition" +
        "\n3. Paper Presentation" +
        "\n4. Hackathon" +
        "\n5. Informal Events"
    )
    .then(() => {
      bot.sendMessage(
        msg.chat.id,
        "To know more about any event, use these commands: " +
          "\nComputer Science: /compScience" +
          "\nElectronics: /electronics" +
          "\nGraphics: /graphics"+
          "\nInformals: /informals" +
          "\nPaper Presentation: /paperPres" +
          "\nHackathon: /hackDetails"
      )
    });
});
