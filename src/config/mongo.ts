import mongoose from 'mongoose';
import { environment } from './environment';

export function initializeMongo() {
  console.log(
    `Starting mongo connection on ${environment.MONGO_CONNECTION_STR}`
  );

  mongoose.connection.on('error', (error) => {
    console.log(error);
    process.exit(-1);
  });

  mongoose
    .connect(environment.MONGO_CONNECTION_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Mongo connection stablished');
    });
}
