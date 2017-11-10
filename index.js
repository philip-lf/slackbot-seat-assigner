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
        console.log(message)
        // const response = message.user === 'U6DMFKVT8' ? true : false  
        if(message.user === 'U6DMFKVT8') { // if the sender is me or not
            rtm.sendMessage(`I can now respond with only my messages:\n ${message.text} !!`, message.channel);
        }
});

// LearnBot APP [11:03 AM] 
// *@channel Pairs for Auther: Authentication Data Flow*
// Adrien Lacquemant
// Silun Zhang

// Jerry Muzsik
// Kenny Diaz

// Bobby Lux
// Daniel Cruser

// John Pepino
// Seth Feibus

// Evans Alexis Stepanov
// Kyle Uehlein

// Bryan Le
// Philip Fahim

// Samuel Yun
// Sol Park

// Hsiangkai Liu
// Mueed Chaudhry

// Alex Villarreal
// Andrew Ziegler

// Mariel Werner
// Rian Halperin

// Mitchell Stewart
// Nicholas Galarza

// Daniel Bernard
// Simon Chan
// Xi Qin

// Arthur Swieckowski
// Hou In Choi

// Carmen Peralta
// Eric Garnett

// Andrey Ivanov
// Veekas Shrivastava

// Allison Zhao
// Douglas Chin

// Claire Liu
// James O'Reilly

// Brian Macdonald
// Michael Romani

// Eren Erdogan
// Rohan Saigal

// Aaron Wong
// Zhe Hua