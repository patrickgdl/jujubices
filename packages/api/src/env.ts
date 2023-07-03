import { config as loadDotenv } from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

export function loadEnvs() {
  loadDotenv();

  const env = cleanEnv(process.env, {
    PORT: port({ default: 8080 }),
    NODE_ENV: str<ENVIRONMENT>({
      default: 'development'
    }),
    IMAGEKIT_PUBLIC_KEY: str(),
    IMAGEKIT_PRIVATE_KEY: str()
  });

  return env;
}

export type EnvType = ReturnType<typeof loadEnvs>;
