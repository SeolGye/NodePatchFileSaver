const mongoose = require('mongoose');
const User = require('../models/user'); // user 모델 경로에 맞게 수정

const connectAndInitializeDatabase  = async (MONGODB_URI) => {
    try {
        await mongoose.connect(MONGODB_URI);
        const user = await User.findOne();
        
        if (!user) {
          const newUser = new User({
            name: 'Namsu',
            email: 'namsu@test.com'
          });
          await newUser.save();
        }
        
        console.log('Database initialized.');
      } catch (error) {
        console.error('Error initializing database:', error);
      }
};


module.exports = connectAndInitializeDatabase;