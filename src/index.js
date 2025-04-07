require('dotenv').config({ path: require('path').resolve(__dirname, '../heart/.env') });

if (!process.env.BOT_TOKEN || !process.env.OPENROUTER_API_KEY || !process.env.MONGODB_URI) {
  console.error('No variables are set in .env!');
  process.exit(1);
}

const { initBot } = require('./bot/bot');
const connectDB = require('../heart/db/db');

connectDB()
  .then(() => {
    initBot();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
