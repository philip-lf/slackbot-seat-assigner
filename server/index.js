const app = require('express')()
const axios = require('axios')
const bodyparser = require('body-parser')

// app.listen(3333, () => {
//     console.log("!!!!!listening!!!!!")
// })

// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({ extended: true }))

// payload={"text": "A very important thing has occurred! <www.google.com|Click here> for details!"}
// curl -X POST -H 'Content-type: application/json' --data '@message.json' https://hooks.slack.com/services/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
// http://172.16.23.59:3333

// app.post('/test', (req, res, next) => {
//     console.log("its working", req.body)
//     res.json(req.body.data.challenge)
// })

// https://dev47178.service-now.com/api/x_174541_slack_sea/handle_slack_events
// https://dev47178.service-now.com/syslog_list.do
// table name: x_174541_slack_sea_all_slack_events

// axios.post('https://hooks.slack.com/services/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', {
//     "text": "POOP\nDOG\nCAT\nno username",
//     "attachments": [{
//         "color": "danger",
//         "title": "picture of brocoli",
//         "image_url": "https://png.pngtree.com/element_pic/16/11/25/3ca34232c273379f47679672ac777253.jpg"
//     }, {
//         "color": "good",
//         "title": "picture of potato\nline two\nline three",
//         "image_url": "https://www.what-dog.net/Images/faces2/scroll0015.jpg"
//     }]
// })


///////////////////////////////////////
// Example LearnBot Input:

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