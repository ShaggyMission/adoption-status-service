const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://admin:Lis12345@54.156.27.209:27017/admin', {
      dbName: 'adoption_db',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to adoption_db');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
