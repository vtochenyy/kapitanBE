import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { DishService } from '../dish/dish.service';
import { NextFunction, Request, Response } from 'express';
import { MenuService } from './menu.service';
import { HttpError } from '../errors/http-error.class';
import { IControllerInteface } from '../common/controller.inteface';
import { ValidatorMiddlewareService } from '../middlewares/validator/validatorMiddleware.service';
import { CreateBuisnessLunchDtoIn } from './dto/in/createBuisnessLunch.dto';
import { CreateOrderDtoIn } from './dto/in/createOrder.dto';
import 'reflect-metadata';

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
                path: '/createBuisnessLunch',
                method: 'post',
                func: this.createMenu,
                middlewares: [
                    new ValidatorMiddlewareService(CreateBuisnessLunchDtoIn, this.loggerService),
                ],
            },
            {
                root: '/menu',
                path: '/getUserOrderByDate',
                method: 'get',
                func: this.getUserOrderByDate,
            },
            {
                root: '/menu',
                path: '/getBuisnessLunchByDate',
                method: 'get',
                func: this.getBuisnessLunchByDate,
            },
            {
                root: '/menu',
                path: '/getAllUserOrders',
                method: 'get',
                func: this.getAllUserOrders,
            },
            {
                root: '/menu',
                path: '/getAllOrders',
                method: 'get',
                func: this.getAllOrders,
            },
            {
                root: '/menu',
                path: '/getOrderById',
                method: 'get',
                func: this.getOrderById,
            },
            {
                root: '/menu',
                path: '/createOrder',
                method: 'post',
                func: this.createOrder,
                middlewares: [new ValidatorMiddlewareService(CreateOrderDtoIn, this.loggerService)],
            },
        ]);
    }

    public async createMenu(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.menuService.createBuisnessLunch(
                String(req.headers.userid),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MenuController'));
        }
    }

    public async getUserOrderByDate(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.menuService.getUserOrderByDate(
                String(req.headers.userid),
                String(req.query.targetDate),
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MenuController'));
        }
    }

    public async getBuisnessLunchByDate(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.menuService.getBuisnessLunchByDate(
                String(req.query.targetDate),
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MenuController'));
        }
    }

    public async getAllUserOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.menuService.getAllUserOrders(String(req.headers.userid), next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MenuController'));
        }
    }

    public async getAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.menuService.getAllOrders(next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MenuController'));
        }
    }

    public async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.menuService.getOrderById(String(req.query.orderId), next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MenuController'));
        }
    }

    public async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.menuService.createOrder(
                String(req.headers.userid),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MenuController'));
        }
    }
}
