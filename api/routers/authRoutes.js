import { Router } from 'express';
import {
  subscribe,
  login,
  logout
} from '../controllers/authController.js';

import { validateToken } from '../middlewares/authGuard.js';
// import * as guard from '../middlewares/authGuard.js';

const router = Router();

router.post('/subscribe', subscribe);
router.post('/login', login);

router.use(validateToken);

router.post('/logout', logout);

export default router;
