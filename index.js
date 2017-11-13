var RtmClient = require('@slack/client').RtmClient; //bot object that references the RTM API
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS; //events that i can dispatch
var RTM_EVENTS = require('@slack/client').RTM_EVENTS; //events that the bot will be listening for
var chalk = require('chalk')
var axios = require('axios')

var rtm = new RtmClient(require('./secret')); // API token

rtm.start();

let channel;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    for (const c of rtmStartData.channels) {
        if (c.is_member && c.name === 'philip-testing') { channel = c.id; console.log(chalk.bgGreen(c.name)) }
    }
    //rtmStartData.self.name === 'seat-assigner'
    //rtmStartData.team.name === 'Fullstack Academy'
    console.log(`Logged in!`);
});

// source ==> https://www.kirupa.com/html5/shuffling_array_js.htm
function arrayShuffle(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {

        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = arr[randomIndex];

        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
    }
    return arr;
}

// make array with all locations based on the number of students
function makeArr(num) {
    let arr = []
    for (var i = 0; i <= num; i++) {
        arr.push(i)
    }
    return arr
}

function isEven(num) {
    if(num % 2 === 0) return true
}

function handleStudents(text) {

    // array of students 
    var arrayOfStudents = text.split('\n\n').join('\n').split('\n')

    let originalArr = makeArr(arrayOfStudents.length)

    const shuffledArr = arrayShuffle(originalArr)

    // number of pairs - number
    var pairs = text.split('\n\n')

    // number of students per pair - array
    var studentsPerPair = text.split('\n\n').map(pair => {
        return pair.split('\n').length
    })

    var studentNamesPerPair = text.split('\n\n').map((pair, i) => {
        var arr = []

        if(isEven(i)) {
            arr.push(shuffledArr[i] + '-' + pair.split('\n')[0])
            arr.push((shuffledArr[i] + 1) + '-' + pair.split('\n')[1])
        } else {
            arr.push((shuffledArr[i] + 1) + '-' + pair.split('\n')[0])
            arr.push(shuffledArr[i] + '-' + pair.split('\n')[1])
        }
        shuffledArr.splice(i, 1)
        shuffledArr.splice(i + 1, 1)

        return arr.join('\n')
    })

    return {
        pairs,
        studentsPerPair,
        studentNamesPerPair,
        arrayOfStudents
    }
}

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    if (message.channel === channel)
        console.log(message)

    const data = handleStudents(message.text)

    if (message.user === 'U6DMFKVT8') { // if the sender is me then send message
        // rtm.sendMessage(`# of PAIRS: ${data.pairs.length}\nSTUDENT NAMES PER PAIR\n${data.studentNamesPerPair.join('\n\n')}\n# OF STUDENTS\n${data.arrayOfStudents.length}`,
        //     message.channel);
        // rtm.sendMessage({"text": "doggggg"}, message.channel)
        // rtm.send({ "text": "dogggg" }, message.channel)

        rtm.send(axios.post('https://hooks.slack.com/services/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', {
            "text": `STUDENT NAMES PER PAIR\n${data.studentNamesPerPair.join('\n\n')}\n# OF STUDENTS\n${data.arrayOfStudents.length}`,
            "attachments": [{
                "color": "good",
                "title": "Seating Chart",
                "image_url": "https://i.imgur.com/g4Z1XPg.jpg"
            }]
        }))
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