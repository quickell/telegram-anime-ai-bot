// requirements section
require('dotenv').config();
const safeSendMessage = require('../utils/safeSend');
const TelegramBot = require('node-telegram-bot-api');
const keyboard = require('./keyboard');
const { askAI } = require('../services/aiService');
const { getFromAniList, getFromJikan, getFromKitsu } = require('../services/animeSearch');
const normalize = require('../utils/normalize');


// mongo db
const connectDB = require('../../heart/db/db');
const saveUser = require('../../heart/db/saveUser');
const User = require('../../heart/models/User');

// command section
const startCommand = require('../commands/start');
const helpCommand = require('../commands/help');
const aboutCommand = require('../commands/about');
const randomCommand = require('../commands/random');
const ofDayCommand = require('../commands/ofDay');

// from here on out all the logic (Yes, it's a monolith. No, I'm not sorry 😈)
async function initBot() {
  await connectDB(); 

  const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
  console.log(`The bot is running on ${process.env.MODEL_NAME}...`);

  // mongo db save
  bot.on('message', async (msg) => {
    await saveUser(msg.from);
  });

  // commands
  bot.onText(/\/start/, (msg) => startCommand(bot, msg));
  bot.onText(/\/help/, (msg) => helpCommand(bot, msg));
  bot.onText(/\/about/, (msg) => aboutCommand(bot, msg));
  bot.onText(/\/random/, (msg) => randomCommand(bot, msg));
  bot.onText(/\/anime/, (msg) => ofDayCommand(bot, msg));

  // description processing
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (msg.photo || msg.document || msg.sticker || msg.voice || msg.video) {
      return safeSendMessage(bot, chatId, '📦 Я понимаю только обычный текст. Попробуй описать словами.');
    }

    if (!text || typeof text !== 'string' || text.startsWith('/')) return;

    const noisePattern = /[^a-zA-Zа-яА-Я0-9\s]/g;
    const letterCount = (text.match(/[a-zA-Zа-яА-Я]/g) || []).length;
    const noiseRatio = (text.match(noisePattern) || []).length / text.length;

    if (letterCount < 3 || noiseRatio > 0.5) {
      return safeSendMessage(bot, chatId, '❌ Сообщение выглядит подозрительно. Опиши сцену подробнее.');
    }

    // try for AI
    try {
      await safeSendMessage(bot, chatId, '🔍 Раскидываю мозгами...');

      const aiTitle = await askAI(text);
      const aiLower = aiTitle.toLowerCase();
      const invalidKeywords = [
        'context',
        'details',
        'remember',
        'could not',
        'unable',
        'suggest',
        'cannot',
      ];

      const looksInvalid =
        aiTitle.length > 50 ||
        invalidKeywords.some(keyword => aiLower.includes(keyword));

      if (looksInvalid) {
        return safeSendMessage(
          bot,
          chatId,
          '❌ Не удалось угадать аниме. Опиши сцену подробнее.'
        );
      }

      const [aniListResult, jikanResult, kitsuResult] = await Promise.all([
        getFromAniList(aiTitle),
        getFromJikan(aiTitle),
        getFromKitsu(aiTitle),
      ]);

      const results = [aniListResult, jikanResult, kitsuResult].filter(Boolean);
      const normAI = normalize(aiTitle);
      const matched = results.find((r) => normalize(r.title) === normAI);

      await safeSendMessage(bot, chatId, `🤖 Я думаю, ты имеешь в виду: *${aiTitle}*`, {
        parse_mode: 'Markdown',
        reply_markup: keyboard,
      });

      if (matched?.imageUrl) {
        await bot.sendPhoto(chatId, matched.imageUrl); 
      }

    } catch (err) {
      console.error('❌ Ошибка:', err);
      safeSendMessage(bot, chatId, '⚠️ Что-то пошло не так. Попробуй позже.');
    }
  });
}

module.exports = { initBot };
