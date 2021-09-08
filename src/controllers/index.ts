import express from 'express';
import AuthController, { CONTROLLER_NAME } from './auth.controller';

const router = express.Router();

router.use(CONTROLLER_NAME, AuthController);

export default router;
