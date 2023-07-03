import ImageKit from 'imagekit';

import { loadEnvs } from '../env';

const env = loadEnvs();

const imagekit = new ImageKit({
  publicKey: env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: 'https://ik.imagekit.io/jujubices/'
});

export async function list(folder: string) {
  const files = await imagekit.listFiles({ path: folder });

  return files;
}

export async function upload(file: Express.Multer.File, folder: string) {
  const upload = await imagekit.upload({
    file: file.buffer,
    fileName: file.originalname,
    folder: folder
  });

  return upload;
}

export async function update(
  file: Express.Multer.File,
  folder: string,
  oldFileId: string
) {
  await imagekit.deleteFile(oldFileId);

  const upload = await imagekit.upload({
    file: file.buffer,
    fileName: file.originalname,
    folder: folder
  });

  return upload;
}
