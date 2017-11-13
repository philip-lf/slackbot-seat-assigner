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

 //USED FOR INDIVIDUAL STUDENTS, BUT NOT WORKING
// Array.prototype.remove = function() {
//     var what, a = arguments, L = a.length, ax;
//     while (L && this.length) {
//         what = a[--L];
//         while ((ax = this.indexOf(what)) !== -1) {
//             this.splice(ax, 1);
//         }
//     }
//     return this;
// };

function handleStudents(text) {

    // array of students 
    var arrayOfStudents = text.split('\n\n').join('\n').split('\n')

    // number of pairs - number
    var pairs = text.split('\n\n')

    let originalArr = makeArr(pairs.length)

    const shuffledArr = arrayShuffle(originalArr)

    // number of students per pair - array
    var studentsPerPair = text.split('\n\n').map(pair => {
        return pair.split('\n').length
    })

    // NOT WORKING FOR INDIVIDUAL STUDENTS
    // var studentNamesPerPair = text.split('\n\n').map((pair, i) => {
    //     const peopleInPair = pair.split('\n')
    //     let currentArrNumber = shuffledArr[i]

    //     for (let x = 0; x < peopleInPair.length; x++) {   // for each pair
    //         peopleInPair[x] = currentArrNumber + ' - ' + peopleInPair[x]
    //         currentArrNumber++
    //     }
    //     shuffledArr.remove(currentArrNumber)

    //     return peopleInPair.join('\n')
    // })

    var studentNamesPerPair = text.split('\n\n').map((pair, i) => {
        return shuffledArr[i] + ' - ' + pair.split('\n').join(' && ')
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
            "text": `LOCATIONS PER PAIR\n${data.studentNamesPerPair.join('\n\n')}`,
            "attachments": [{
                "color": "good",
                "title": "Seating Chart",
                "image_url": "https://i.imgur.com/2u0N1Ud.jpg"
            }]
        }))
        .catch(err => console.log(err))
    }
});

// LearnBot APP [11:03 AM] 
// *@channel Pairs for Auther: Authentication Data Flow*
