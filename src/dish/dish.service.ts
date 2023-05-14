import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { BaseRepository } from '../common/base.repository';
import { NextFunction } from 'express';
import { baseAnswer } from '../common/baseAnswer';
import { HttpError } from '../errors/http-error.class';
import { IDatabaseService } from '../db/databaseService.interface';
import { IIncomingQueryLogsMiddlewareInterface } from '../middlewares/logs/incomingQueryLogsMiddleware.interface';
import { Dish } from '@prisma/client';

@injectable()
export class DishService {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.DishRepository) private dishRepository: BaseRepository,
        @inject(TYPES.DatabaseService) private databaseService: IDatabaseService,
        @inject(TYPES.IncomingQueryLogsMeddlewareService)
        private incomingQueryLogsMeddlewareService: IIncomingQueryLogsMiddlewareInterface
    ) {}

    public async createDish(adminId: string, params: Dish, next: NextFunction) {
        try {
            params.createdBy = adminId;
            const data = await this.dishRepository.create(params);
            return baseAnswer(201, data, []);
        } catch (e) {
            next(new HttpError(500, String(e), 'DishService'));
        }
    }

    public async getDishById(id: string, next: NextFunction) {
        try {
            const data = await this.dishRepository.findRecordById(id);
            return baseAnswer(200, data, []);
        } catch (e) {
            next(new HttpError(500, String(e), 'DishService'));
        }
    }

    public async getAllDishes(next: NextFunction) {
        try {
            let data = await this.dishRepository.findAll();
            return baseAnswer(200, data, []);
        } catch (e) {
            next(new HttpError(500, String(e), 'DishService'));
        }
    }

    public async deleteDish(adminId: string, id: string, next: NextFunction) {
        try {
            const data = await this.dishRepository.deleteById(id);
            if (!!data.error) {
                throw new Error(data.error);
            }
            return baseAnswer(200, data, []);
        } catch (e) {
            next(new HttpError(500, String(e), 'DishService'));
        }
    }

    public async updateDishById(adminId: string, id: string, params: any, next: NextFunction) {
        try {
            console.log(id);
            const data = await this.dishRepository.update(id, params);
            return baseAnswer(200, data, []);
        } catch (e) {
            next(new HttpError(500, String(e), 'DishService'));
        }
    }
}
