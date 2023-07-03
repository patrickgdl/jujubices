import express from 'express';

import imgKitRoutes from './routes/imagekit';

const router = express.Router();

router.get('/status', (_, res) => {
  res.send(`Yes, I'm here!! - ${new Date().toLocaleString('pt-BR')}`);
});

router.use('/imagekit', imgKitRoutes);

export default router;
