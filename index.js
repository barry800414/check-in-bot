const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const PORT = process.env.PORT || 5000;
const config = require('./bottender.config.js').messenger;

const bot = new MessengerBot({
  accessToken: process.env.accessToken ? process.env.accessToken: config.accessToken,
  appSecret: process.env.appSecret ? process.env.appSecret: config.appSecret,
});

bot.onEvent(async context => {
  if (context.event.isText) {
    console.log(context.event.text);
    await context.sendText(context.event.text);
  }
});

const server = createServer(bot, {
  verifyToken: process.env.verifyToken ? process.env.verifyToken: config.verifyToken,
});

server.listen(PORT, () => {
  console.log(`server is running on ${PORT} port...`);
});
