import { Router } from "express";

import { readLogs, createLog, testBogus } from '../controllers/logController.js';

const router = Router();

router.get('/', readLogs);
router.post('/', createLog);
router.post('/test', testBogus)

export default router;