import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { BaseRepository } from '../common/base.repository';
import { IDatabaseService } from '../db/databaseService.interface';
import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { baseAnswer } from '../common/baseAnswer';
import { BuisnessLunch } from '@prisma/client';

type CreateOrderParams = {
    targetDate: string;
    buisnessLunchId?: string;
    dishes: string[];
};

type CreateMenuParams = {
    targetDate: string;
    buisnessLunchId?: string;
    createdBy: string;
};

@injectable()
export class MenuService {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.DatabaseService) private databaseService: IDatabaseService,
        @inject(TYPES.DishRepository) private dishRepository: BaseRepository,
        @inject(TYPES.MenuRepository) private menuRepository: BaseRepository,
        @inject(TYPES.DishToMenuRepository) private dishToMenuRepository: BaseRepository,
        @inject(TYPES.UserRepository) private userRepository: BaseRepository,
        @inject(TYPES.BuisnessLunchRepository) private buisnessLunchRepository: BaseRepository,
        @inject(TYPES.DishToBuisnessLunchRepository)
        private dishToBuisnessLunchRepository: BaseRepository
    ) {}

    public async createBuisnessLunch(adminId: string, params: any, next: NextFunction) {
        try {
            let data = {};
            let targetBuisnessLunch: BuisnessLunch;
            await this.databaseService.client.$transaction(async () => {
                targetBuisnessLunch = await this.buisnessLunchRepository.create({
                    targetDate: new Date(params.targetDate),
                    createdBy: adminId,
                });
                const buisnessLunchDishes = params.buisnessLunchDishes.map((x: string) => ({
                    dishId: x,
                    buisnessLunchId: targetBuisnessLunch.id,
                    createdBy: adminId,
                }));
                data = await this.dishToBuisnessLunchRepository.createMany(buisnessLunchDishes);
            });
            // @ts-ignore
            return baseAnswer(201, { buisnessLunch: targetBuisnessLunch, items: data }, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'MenuService'));
        }
    }

    public async getBuisnessLunchByDate(targetDate: string, next: NextFunction) {
        try {
            const targetBuisnessLunch = await this.buisnessLunchRepository
                .findByCriteria({
                    targetDate: new Date(targetDate),
                })
                .then((x) => x[0]);
            const dishesToBuisnessLunch = await this.dishToBuisnessLunchRepository
                .findByCriteria({
                    buisnessLunchId: targetBuisnessLunch.id,
                })
                .then((x) => x.map((y) => y.dishId));
            const buisnessLunchDishes = await this.dishRepository.findByCriteria({
                id: { in: dishesToBuisnessLunch },
            });
            return baseAnswer(
                200,
                {
                    buisnessLunch: {
                        ...targetBuisnessLunch,
                        targetDate: new Date(targetBuisnessLunch.targetDate)
                            .toISOString()
                            .substring(0, 10),
                    },
                    businessLunchDishes: buisnessLunchDishes,
                },
                {}
            );
        } catch (e) {
            next(new HttpError(500, String(e), 'MenuService'));
        }
    }

    public async createOrder(userId: string, params: CreateOrderParams, next: NextFunction) {
        try {
            let data = {};
            await this.databaseService.client.$transaction(async () => {
                const menuParams: CreateMenuParams = {
                    targetDate: params.targetDate,
                    createdBy: userId,
                };
                !!params.buisnessLunchId && (menuParams.buisnessLunchId = params.buisnessLunchId);
                const menu = await this.menuRepository.create(menuParams);
                const dishToMenuParams = params.dishes.map((x) => ({
                    dishId: x,
                    menuId: menu.id,
                    createdBy: userId,
                }));
                const menuItems = await this.dishToMenuRepository.createMany(dishToMenuParams);
                data = { menu: { ...menu, menuItems: menuItems } };
            });
            return baseAnswer(201, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'MenuService'));
        }
    }
}
