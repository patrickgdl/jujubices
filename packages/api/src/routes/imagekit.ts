import express, { Request, Response } from 'express';

import { list, update, upload } from '../services/imagekit';
import fileUpload from '../common/middleware/multer';

const router = express.Router();

router.get('/:folder', async (req: Request, res: Response) => {
  const { folder } = req.params;

  if (!folder) {
    return res.status(400).json({ error: 'No folder provided' });
  }

  try {
    const templates = await list(folder);

    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

router.post('/:folder', fileUpload, async (req: Request, res: Response) => {
  const file = req.file;
  const { folder } = req.params;

  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  if (!folder) {
    return res.status(400).json({ error: 'No folder provided' });
  }

  try {
    const uploadRes = await upload(file, folder);

    res.json(uploadRes);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

router.put('/:folder', fileUpload, async (req: Request, res: Response) => {
  const file = req.file;
  const oldFileId = req.body.oldFileId;
  const { folder } = req.params;

  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  if (!folder) {
    return res.status(400).json({ error: 'No folder provided' });
  }

  if (!oldFileId) {
    return res.status(400).json({ error: 'No oldFileId provided' });
  }

  try {
    const uploadRes = await update(file, folder, oldFileId);

    res.json(uploadRes);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

export default router;
