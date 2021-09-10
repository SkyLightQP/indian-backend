import express from 'express';
import fs from 'fs';

const router = express.Router();

fs.readdirSync(__dirname).forEach(async (file) => {
  if (file.includes('.ts') || file.includes('.js')) {
    if (file !== 'index.ts' && file !== 'index.js') {
      const i = await import(`./${file}`);
      router.use(i.CONTROLLER_NAME, i.default);
    }
  }
});

export default router;
