const axios = require('axios');

module.exports = async (bot, msg) => {
  try {
    const res = await axios.get('https://api.jikan.moe/v4/random/anime');
    const anime = res.data.data;

    await bot.sendMessage(msg.chat.id, `🎲 *Случайное аниме:*\n${anime.title}`, { parse_mode: 'Markdown' });
    await bot.sendPhoto(msg.chat.id, anime.images.jpg.large_image_url);
  } catch {
    bot.sendMessage(msg.chat.id, '⚠️ Не удалось получить случайное аниме.😞');
  }
};
