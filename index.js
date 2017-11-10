var RtmClient = require('@slack/client').RtmClient; //bot object that references the RTM API
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS; //events that the bot will be listening for
var chalk = require('chalk')

var rtm = new RtmClient(require('./secret')); // API token

rtm.start();

let channel;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    for (const c of rtmStartData.channels) {
        if (c.is_member && c.name === 'philip-testing') { channel = c.id; console.log(chalk.bgGreen(c.name)) }
    }
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    rtm.sendMessage("wazzup!", channel);
});