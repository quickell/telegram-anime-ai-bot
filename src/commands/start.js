const keyboard = require('../bot/keyboard');

module.exports = (bot, msg) => {
  bot.sendMessage(msg.chat.id, `
👋 Привет, *${msg.from.first_name || 'друг'}*!

Я угадываю аниме по описанию. Просто напиши, что помнишь и я постараюсь дать тебе точный ответ! 😁

📦 Команды:
/help — как пользоваться  
/about — о боте  
/random — случайное аниме  
/anime — аниме дня

👤 Автор: *quickell*
  `, { parse_mode: 'Markdown', reply_markup: keyboard });
};
