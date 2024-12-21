import { Router } from 'express';
import * as logService from './log.service.js';

export const logRouter = Router();

logRouter.post('/', logService.createLog);
logRouter.get('/', logService.FetchLogs);
