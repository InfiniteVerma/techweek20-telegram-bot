var bot = require("./bot");
//event details
require("./eventDetails/eventDetails");
require("./eventDetails/cs");
require("./eventDetails/elec");
require("./eventDetails/pp");
require("./eventDetails/hack");
require("./eventDetails/info");

// require("./trasheventRegistration");

//participant registration
require("./participant/details");
require("./participant/participantRegistration");
require("./participant/submitForm");

//event registration
require("./eventRegistration/elecWorkshop");
require("./eventRegistration/ppEvent");
require("./eventRegistration/csoffline")

//start command
require("./start/start");
// require("./trashsubmitEvents");
