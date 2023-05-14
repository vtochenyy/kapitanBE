import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { BaseRepository } from '../common/base.repository';
import { IDatabaseService } from '../db/databaseService.interface';
import { NextFunction } from 'express';
import { HttpError } from '../errors/http-error.class';
import { baseAnswer } from '../common/baseAnswer';
import { BuisnessLunch } from '@prisma/client';
import 'reflect-metadata';

type CreateOrderParams = {
    targetDate: string;
    buisnessLunchId?: string;
    dishes?: string[];
};

type CreateMenuParams = {
    targetDate: Date;
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
                    targetDate: new Date(params.targetDate),
                    createdBy: userId,
                };
                if (!!params.buisnessLunchId) {
                    const isProvidedBuisnessLunchDateEqualsToOriginal =
                        await this.buisnessLunchRepository
                            .findByCriteria({
                                targetDate: menuParams.targetDate,
                            })
                            .then((x) => x[0])
                            .then((x) => {
                                return x.id === params.buisnessLunchId;
                            });
                    if (isProvidedBuisnessLunchDateEqualsToOriginal) {
                        !!params.buisnessLunchId &&
                            (menuParams.buisnessLunchId = params.buisnessLunchId);
                        const menu = await this.menuRepository.create(menuParams);
                        if (!!params.dishes) {
                            const dishToMenuParams = params.dishes.map((x) => ({
                                dishId: x,
                                menuId: menu.id,
                                createdBy: userId,
                            }));
                            const menuItems = await this.dishToMenuRepository.createMany(
                                dishToMenuParams
                            );
                            data = { order: { ...menu, menuItems: menuItems } };
                        } else {
                            data = { order: { ...menu } };
                        }
                    } else {
                        throw new Error('Date of provided buisness lunch is incorrect');
                    }
                } else if (!params.buisnessLunchId) {
                    const menu = await this.menuRepository.create(menuParams);
                    if (!!params.dishes) {
                        const dishToMenuParams = params.dishes.map((x) => ({
                            dishId: x,
                            menuId: menu.id,
                            createdBy: userId,
                        }));
                        const menuItems = await this.dishToMenuRepository.createMany(
                            dishToMenuParams
                        );
                        data = { order: { ...menu, menuItems: menuItems } };
                    } else {
                        data = { order: { ...menu } };
                    }
                } else {
                    throw new Error('Interlan server error');
                }
            });
            return baseAnswer(201, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'MenuService'));
        }
    }

    public async getUserOrderByDate(userId: string, targetDate: string, next: NextFunction) {
        try {
            const targetMenu = await this.menuRepository
                .findByCriteria({ createdBy: userId, targetDate: new Date(targetDate) })
                .then((x) => x[0]);
            if (!!targetMenu) {
                const dishesToMenuDishesIds = await this.dishToMenuRepository
                    .findByCriteria({
                        menuId: targetMenu.id,
                    })
                    .then((x) => x.map((y) => y.dishId));
                const dishes = await this.dishRepository.findByCriteria({
                    id: { in: dishesToMenuDishesIds },
                });
                return baseAnswer(
                    200,
                    {
                        order: {
                            ...targetMenu,
                            targetDate: new Date(targetMenu.targetDate)
                                .toISOString()
                                .substring(0, 10),
                            orderItems: dishes,
                        },
                    },
                    {}
                );
            } else {
                throw new Error('Order for this user by this date was not found');
            }
        } catch (e) {
            next(new HttpError(500, String(e), 'MenuService'));
        }
    }

    public async getAllUserOrders(userId: string, next: NextFunction) {
        try {
            const allMenus = await this.menuRepository
                .findByCriteria({ createdBy: userId }, { orderBy: { targetDate: 'desc' } })
                .then((x) =>
                    x.map((y) => ({
                        ...y,
                        targetDate: new Date(y.targetDate).toISOString().substring(0, 10),
                    }))
                );
            return baseAnswer(200, { allMenus }, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'MenuService'));
        }
    }

    public async getAllOrders(next: NextFunction) {
        try {
            const allMenus = await this.menuRepository
                .findByCriteria({}, { orderBy: { targetDate: 'desc' } })
                .then((x) =>
                    x.map((y) => ({
                        ...y,
                        targetDate: new Date(y.targetDate).toISOString().substring(0, 10),
                    }))
                );
            return baseAnswer(200, { allMenus }, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'MenuService'));
        }
    }

    public async getOrderById(orderId: string, next: NextFunction) {
        try {
            const order = await this.menuRepository.findRecordById(orderId);
            return baseAnswer(
                200,
                { ...order, targetDate: new Date(order.targetDate).toISOString().substring(0, 10) },
                {}
            );
        } catch (e) {
            next(new HttpError(500, String(e), 'MenuService'));
        }
    }
}
