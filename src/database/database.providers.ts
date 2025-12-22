import * as mongoose from 'mongoose'; // Mongoose library

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION', // Injection token for DB connection
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost:27017/Authentication'), // Connect to MongoDB
  },
];
  