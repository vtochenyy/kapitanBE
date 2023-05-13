import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { DishService } from '../dish/dish.service';
import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { MenuService } from './menu.service';
import { HttpError } from '../errors/http-error.class';
import { IControllerInteface } from '../common/controller.inteface';
import { ValidatorMiddlewareService } from '../middlewares/validator/validatorMiddleware.service';

@injectable()
export class MenuController extends BaseController implements IControllerInteface {
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.DishService) private dishService: DishService,
        @inject(TYPES.MenuService) private menuService: MenuService
    ) {
        super(loggerService);
        this.bindApi();
    }

    public bindApi() {
        this.bindRoutes([
            {
                root: '/menu',
                path: '/createMenu',
                method: 'post',
                func: this.createMenu,
            },
        ]);
    }

    public async createMenu(req: Request, res: Response, next: NextFunction) {}
}
