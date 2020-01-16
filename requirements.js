var bot = require("./bot");
//event details
require("./eventDetails/eventDetails");
require("./eventDetails/cs");
require("./eventDetails/elec");
require("./eventDetails/pp");
require("./eventDetails/hack");
require("./eventDetails/info");
require("./eventDetails/graphics")
// require("./trasheventRegistration");

//participant registration
require("./participant/details");
require("./participant/participation1");
// require("./participant/submitForm");

//event registration
require("./eventRegistration/elecWorkshop");
require("./eventRegistration/ppEvent");
require("./eventRegistration/csoffline")
require("./eventRegistration/hackathon")
require("./eventRegistration/blackFlag")
require("./eventRegistration/informalQuiz")
require("./eventRegistration/scout")
require("./eventRegistration/magna")

//start command
require("./start/start");
require("./start/developers")
require("./start/help")
// require("./trashsubmitEvents");
