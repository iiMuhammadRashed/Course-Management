import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Database connected successfully...');
});

mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected');
});

const gracefulShutdown = async signal => {
  try {
    await mongoose.connection.close();
    console.log(`Mongoose connection closed due to ${signal}`);
    process.exit(0);
  } catch (err) {
    console.error(
      `Error closing Mongoose connection on ${signal}:`,
      err.message,
    );
    process.exit(1);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT (Ctrl+C)'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('unhandledRejection', async err => {
  console.error('Unhandled Rejection:', err.message);
  try {
    await mongoose.connection.close();
    console.log('Mongoose connection closed due to unhandled rejection');
    process.exit(1);
  } catch (closeErr) {
    console.error('Error closing connection:', closeErr.message);
    process.exit(1);
  }
});

export default connectDB;
