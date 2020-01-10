require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
 
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
 
// start command
//on start
bot.onText(/\/start/, (msg) => {

  bot.sendMessage(chatId, 'Welcome. Awailable commands: \n1. \help\n2. \register');
});

bot.onText(/\/register/, (msg)=>{
  bot.sendMessage(charId, 'Registration command!');
});


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
 
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});