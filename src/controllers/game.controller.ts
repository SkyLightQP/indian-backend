import express, { Request, Response } from 'express';
import { authenticated } from '../common/middlewares/auth.middleware';
import { validateBody } from '../common/middlewares/validator.middleware';
import {
  createGameBoard,
  deleteGameBoard,
  getGameBoard,
  getGameBoards,
  updateGameBoard
} from '../services/gameBoard.service';
import { GameCreateDto } from './dto/game-create-dto';
import { GameUpdateDto } from './dto/game-update-dto';

export const CONTROLLER_NAME = '/game';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.sendData(200, await getGameBoards());
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  res.sendData(200, await getGameBoard(id));
});

router.post('/', authenticated, validateBody(GameCreateDto), async (req, res) => {
  const { title, content, tags, startLink, image, companyId } = req.body;
  const data = await createGameBoard({
    title,
    content,
    tags,
    startLink,
    image,
    writerId: req.user?.uuid,
    companyId
  });
  res.sendData(201, data);
});

router.patch('/:id', authenticated, validateBody(GameUpdateDto), async (req, res) => {
  const { title, content, tags, startLink, image } = req.body;
  const data = await updateGameBoard(req.params.id, {
    title,
    content,
    tags,
    startLink,
    image
  });
  res.sendData(200, data);
});

router.delete('/:id', authenticated, async (req, res) => {
  await deleteGameBoard(req.params.id);
  res.sendData(200, true);
});
export default router;
