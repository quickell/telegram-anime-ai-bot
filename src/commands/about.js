module.exports = (bot, msg) => {
  bot.sendMessage(msg.chat.id, `
ℹ️ *О боте:*
Использует:
- 🤖 AI (Gemini, ChatGPT)
- 📚 AniList, Jikan, Kitsu :)
- 📦 MongoDB

👤 Автор: *quickell*
  `, { parse_mode: 'Markdown' });
};
