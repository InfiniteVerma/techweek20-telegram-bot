require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { Client } = require("pg");
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
module.exports = bot;