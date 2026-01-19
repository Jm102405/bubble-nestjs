import * as mongoose from 'mongoose'; // Mongoose library
import { ConfigService } from '@nestjs/config'; // Import ConfigService

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION', // Injection token for DB connection
    inject: [ConfigService], // Inject ConfigService
    useFactory: async (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(configService.get<string>('MONGODB_URI')!),
  },
];
