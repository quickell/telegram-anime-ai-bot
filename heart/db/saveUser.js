const User = require('../models/User');

async function saveUser({ id, username, first_name }) {
  try {
    const existingUser = await User.findOne({ telegram_id: id });

    if (!existingUser) {
      await User.create({ telegram_id: id, username, first_name });
      console.log(`User ${username} has been successfully saved to MongoDB`);
    }
    
  } catch (err) {
    console.error('Error while saving user:', err);
  }
}

module.exports = saveUser;
