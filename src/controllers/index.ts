import express from 'express';

const routers = [import('./auth.controller'), import('./company.controller'), import('./game.controller')];

const router = express.Router();

routers.forEach(async (r) => {
  const controller = await r;
  router.use(controller.CONTROLLER_NAME, controller.default);
});

export default router;
