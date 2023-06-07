const TelegramBot = require('node-telegram-bot-api');
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// grabs the telegram bot token environment variable
const token = process.env.TELEGRAM_BOT_KEY;

// starts a new Telegram bot instance that "polls" for updates
const bot = new TelegramBot(token, { polling: true });

// Queries the latest XKCD comic and sends as a telegram message whenever the server is instantiated.
app.get('/', (req, res) => {
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
