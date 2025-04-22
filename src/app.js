import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import errorHandler from './middleware/error.js';
import mongoSanitize from 'express-mongo-sanitize';
import routes from './routes/index.js';
import rateLimiter from './middleware/rateLimiter.js';
import AppError from './utils/appError.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev'));
app.use(rateLimiter);
app.use(express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/v1', routes);

app.all('*', (req, res, next) =>
  next(new AppError(`Route ${req.originalUrl} not found`, 404)),
);
app.use(errorHandler);

export default app;
