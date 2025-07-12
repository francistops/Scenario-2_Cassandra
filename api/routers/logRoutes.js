import { Router } from "express";

import { readLogs, createLog } from '../controllers/logController.js';

const router = Router();

router.get('/', readLogs);
router.post('/', createLog);

export default router;