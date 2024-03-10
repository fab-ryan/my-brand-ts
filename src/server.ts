import { app } from './index';
import { envConfig } from './config';
import dbConnection from './database';

dbConnection();

app.listen(envConfig.port, () => {
  console.log(`Server is running at http://localhost:${envConfig.port}`);
});
