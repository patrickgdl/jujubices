import cors from 'cors';
import express from 'express';

import morgan from './common/middleware/morgan';
import { rateLimiter } from './common/middleware/rate-limit';
import { loadEnvs } from './env';
import routes from './routes';

const URL_PREFIX = '/api';

async function bootstrap() {
  const env = loadEnvs();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan);

  app.use(URL_PREFIX, rateLimiter);
  app.use(URL_PREFIX, routes);

  app.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT}`);
  });
}

bootstrap();
