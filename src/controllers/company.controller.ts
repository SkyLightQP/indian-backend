import express, { Request, Response } from 'express';
import {
  createCompanyBoard,
  deleteCompanyBoard,
  getCompanyBoard,
  getCompanyBoards,
  updateCompanyBoard
} from '../services/companyBoard.service';
import { validateBody } from '../common/middlewares/validator.middleware';
import { CompanyCreateDto } from './dto/company-create-dto';
import { authenticated } from '../common/middlewares/auth.middleware';
import { CompanyUpdateDto } from './dto/company-update-dto';

export const CONTROLLER_NAME = '/company';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.sendData(200, await getCompanyBoards());
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  res.sendData(200, await getCompanyBoard(id));
});

router.post('/', authenticated, validateBody(CompanyCreateDto), async (req, res) => {
  const { name, description, tags, link, image } = req.body;
  const data = await createCompanyBoard({
    name,
    description,
    tags,
    link,
    image,
    writerId: req.user?.uuid
  });
  res.sendData(201, data);
});

router.patch('/:id', authenticated, validateBody(CompanyUpdateDto), async (req, res) => {
  const { name, description, tags, link, image } = req.body;
  const data = await updateCompanyBoard(req.params.id, {
    name,
    description,
    tags,
    link,
    image
  });
  res.sendData(200, data);
});

router.delete('/:id', authenticated, async (req, res) => {
  await deleteCompanyBoard(req.params.id);
  res.sendData(200, true);
});

export default router;
