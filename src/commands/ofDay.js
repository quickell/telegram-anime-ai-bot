const axios = require('axios');

module.exports = async (bot, msg) => {
  try {
    const res = await axios.get('https://api.jikan.moe/v4/top/anime');
    const list = res.data.data;
    const index = new Date().getDate() % list.length;
    const anime = list[index];

    await bot.sendMessage(msg.chat.id, `📺 *Аниме дня:*\n${anime.title}`, { parse_mode: 'Markdown' });
    await bot.sendPhoto(msg.chat.id, anime.images.jpg.large_image_url);
  } catch {
    bot.sendMessage(msg.chat.id, '⚠️ Не удалось загрузить аниме дня.😞');
  }
};
