import { Router } from 'express';
import * as logService from './log.service.js';

export const logRouter = Router();
// 7
logRouter.post('/', logService.createLog);