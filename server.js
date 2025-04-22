import 'dotenv/config.js';
import app from './src/app.js';
import connectDB from './src/config/database.js';

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(process.env.PORT, error => {
      if (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
      }
      console.log(`Server running on port ${process.env.PORT}`);
    });

    const shutdown = async signal => {
      console.log(`${signal} received: closing server`);
      try {
        server.close();
        console.log('Server closed');
        process.exit(0);
      } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
      }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
};

process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION:', err);
  process.exit(1);
});

startServer();
