import { Connection } from 'mongoose'; // Mongoose connection type
import { UserSchema } from '../../database/schemas/users.schema'; // User schema

export const usersProviders = [
  {
    provide: 'USERS_MODEL', // Injection token for User model
    useFactory: (connection: Connection) => connection.model('User', UserSchema), // Create model
    inject: ['DATABASE_CONNECTION'], // Inject database connection
  },
];
