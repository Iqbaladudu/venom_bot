// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const fs = require('fs')

venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage( (message) => {
    const data_tour = fs.readFileSync('./text/tour.txt');
    const data_iqbal = fs.readFileSync('./text/desain.txt');
    // const media = MessageMedia.fromFilePath('./text/tour.png');
    // client.sendMessage(message.from, media, { caption: `${data_tour}` });
    // client.sendMessage(message.from, `${data_iqbal}`)
    
    if (message.isGroupMsg === true) {
      client
        .sendText(message.from, `${data_iqbal}`)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      
      client
        .sendImage(
          message.from,
          'text/tour.png',
          'Hanania Tour and Travel',
          `${data_tour}`
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    } else if (message.isGroupMsg === false && message.body === "!button") {
      client.sendButtons(message.from, 'Title', buttons, 'Description')
        .then((result) => {
            console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  }
  );
}