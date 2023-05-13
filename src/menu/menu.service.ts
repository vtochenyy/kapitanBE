import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { BaseRepository } from '../common/base.repository';
import { NextFunction } from 'express';
import { HttpError } from '../errors/http-error.class';
import { baseAnswer } from '../common/baseAnswer';
import { IDatabaseService } from '../db/databaseService.interface';
import moment from 'moment';
import 'reflect-metadata';

@injectable()
export class MenuService {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.DatabaseService) private databaseService: IDatabaseService,
        @inject(TYPES.DishRepository) private dishRepository: BaseRepository,
        @inject(TYPES.TypeOfDishRepository) private typeOfDishRepository: BaseRepository,
        @inject(TYPES.TypeOfFoodIntakesRepository)
        private typeOfFoodIntakesRepository: BaseRepository,
        @inject(TYPES.GlobalMenuRepository) private globalMenuRepository: BaseRepository,
        @inject(TYPES.DishToGlobalMenuRepository)
        private dishToGlobalMenuRepository: BaseRepository,
        @inject(TYPES.MenuRepository) private menuRepository: BaseRepository,
        @inject(TYPES.DishToMenuRepository) private dishToMenuRepository: BaseRepository,
        @inject(TYPES.UserRepository) private userRepository: BaseRepository,
        @inject(TYPES.TableRepository) private tableRepository: BaseRepository
    ) {}
}
