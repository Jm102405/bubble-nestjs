import { Connection } from 'mongoose'; // Mongoose connection type
import { ClientSchema } from '../../database/schemas/clients.schema'; // Client schema

export const clientsProviders = [
  {
    provide: 'CLIENTS_MODEL', // Injection token for Client model
    useFactory: (connection: Connection) => connection.model('Client', ClientSchema), // Create model
    inject: ['DATABASE_CONNECTION'], // Inject database connection
  },
];
