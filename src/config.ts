import 'dotenv/config';

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/legal-dictionary',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  redisPassword: process.env.REDIS_PASSWORD,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  cacheExpiration: 3600 // 1 hour in seconds
}; 