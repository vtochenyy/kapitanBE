import { NextFunction, Request, Response } from 'express';
import { OutgoingQueriesLog } from '@prisma/client';

export interface IIncomingQueryLogsMiddlewareInterface {
    log(req: Request, res: Response, next: NextFunction): void;
}
