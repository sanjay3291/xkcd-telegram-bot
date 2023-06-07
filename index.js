const TelegramBot = require('node-telegram-bot-api');
const express = require("express");
const fetch = require("node-fetch");

const app = express();

const PORT = process.env.PORT || 3000;

// grabs the telegram bot token environment variable
const token = process.env.TELEGRAM_BOT_KEY;

// starts a new Telegram bot instance that "polls" for updates
const bot = new TelegramBot(token, { polling: true });


// server home page
app.get('/', (req, res) => {
  res.send('Navigate to /sendMessage for the comic');
});

// queries the latest XKCD comic and sends as a telegram message whenever the server is instantiated.
app.get('/sendMessage', (req, res) => {
  fetch('https://xkcd.com/info.0.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      const chatId = process.env.GROUP_CHAT_ID;
      bot.sendPhoto(chatId, data.img, { caption: data.alt});
    });
  res.send('Message sent');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
