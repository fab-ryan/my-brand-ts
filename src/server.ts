import { app } from './index';
import { envConfig } from './config';


app.listen(envConfig.port, () => {
  console.log(`Server is running at http://localhost:${envConfig.port}`);
});
