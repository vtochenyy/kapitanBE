import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { BaseRepository } from '../common/base.repository';
import { INewsService } from './news.service.interface';
import { baseAnswer } from '../common/baseAnswer';
import { HttpError } from '../errors/http-error.class';
import 'reflect-metadata';

@injectable()
export class NewsService implements INewsService {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.NewsRepository)
        private newsRepository: BaseRepository
    ) {}

    public async createNew(adminId: string, params: any, next: NextFunction) {
        try {
            params = { ...params, createdBy: adminId };
            const data = await this.newsRepository.create(params);
            return baseAnswer(201, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'NewsService'));
        }
    }

    public async updateNewById(recordId: string, params: any, next: NextFunction) {
        try {
            const data = await this.newsRepository.update(recordId, params);
            return baseAnswer(201, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'NewsService'));
        }
    }

    public async deleteNewById(recordId: string, next: NextFunction) {
        try {
            const data = await this.newsRepository.deleteById(recordId);
            if (!!data.error) {
                throw new Error(data.error);
            }
            return baseAnswer(201, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'NewsService'));
        }
    }
}
