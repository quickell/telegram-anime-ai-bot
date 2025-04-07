// middleware
module.exports = async function safeSendMessage(bot, chatId, text, options = {}) {
  try {
    await bot.sendMessage(chatId, text, options);
  } catch (err) {
    if (
      err.response &&
      err.response.body &&
      err.response.body.error_code === 429
    ) {
      const retryAfter = err.response.body.parameters?.retry_after || 5;
      console.warn(`Rate limit hit. Retrying after ${retryAfter} seconds...`);

      
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return safeSendMessage(bot, chatId, text, options);
    }

    console.error('Error when sending a message:', err.message || err);
  }
};
