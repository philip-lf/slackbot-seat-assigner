var RtmClient = require('@slack/client').RtmClient; //bot object that references the RTM API
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS; //events that i can dispatch
var RTM_EVENTS = require('@slack/client').RTM_EVENTS; //events that the bot will be listening for
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

// Message that Bot will post in Slack
// rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
//     rtm.sendMessage("wazzup!", channel);  
// });

rtm.on(RTM_EVENTS.MESSAGE, function(message) {
    if (message.channel === channel)
        rtm.sendMessage(`I can now respond ${message.text}!!`, message.channel);
});