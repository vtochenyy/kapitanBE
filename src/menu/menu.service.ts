import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { BaseRepository } from '../common/base.repository';
import { IDatabaseService } from '../db/databaseService.interface';
import 'reflect-metadata';

@injectable()
export class MenuService {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.DatabaseService) private databaseService: IDatabaseService,
        @inject(TYPES.DishRepository) private dishRepository: BaseRepository,
        @inject(TYPES.MenuRepository) private menuRepository: BaseRepository,
        @inject(TYPES.DishToMenuRepository) private dishToMenuRepository: BaseRepository,
        @inject(TYPES.UserRepository) private userRepository: BaseRepository
    ) {}
}
