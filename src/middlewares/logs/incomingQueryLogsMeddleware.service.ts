import { NextFunction, Request, Response } from 'express';
import { IIncomingQueryLogsMiddlewareInterface } from './incomingQueryLogsMiddleware.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import { BaseRepository } from '../../common/base.repository';
import 'reflect-metadata';

@injectable()
export class IncomingQueryLogsMeddlewareService implements IIncomingQueryLogsMiddlewareInterface {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.IncomingQueryLogsRepository)
        private incomingQueryLogsRepository: BaseRepository
    ) {}

    public async log(req: Request, res: Response, next: NextFunction): Promise<void> {
        this.logger.log([
            `Outgoing request received`,
            `URL: ${req.url}`,
            `METHOD: ${req.method}`,
            `HEADERS: ${req.rawHeaders}`,
            `BODY: ${JSON.stringify(req.body)}`,
            `DATE-TIME: ${new Date().toLocaleString()}`,
        ]);
        await this.incomingQueryLogsRepository.create({
            url: req.url,
            method: req.method,
            headers: JSON.stringify(req.rawHeaders),
            requestBody: JSON.stringify(req.body),
        });
        next();
    }
}
