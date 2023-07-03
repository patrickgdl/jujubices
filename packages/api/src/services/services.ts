import ImageKitService from './imagekit';
import { EnvType } from '../env';

class Services {
  public env: EnvType;
  public imagekit: ImageKitService;

  constructor(env: EnvType) {
    this.env = env;
    this.imagekit = new ImageKitService(env);
  }
}

export default Services;
