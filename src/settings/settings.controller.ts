import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IControllerInteface } from '../common/controller.inteface';
import { ValidatorMiddlewareService } from '../middlewares/validator/validatorMiddleware.service';
import { CreateSettingDtoIn } from './dto/in/createSetting.dto';
import { UpdateSettingDtoIn } from './dto/in/updateSetting.dto';
import { ISettingsService } from './settings.service.interface';
import 'reflect-metadata';

@injectable()
export class SettingsController extends BaseController implements IControllerInteface {
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.SettingsService) private newsService: ISettingsService
    ) {
        super(loggerService);
        this.bindApi();
    }

    public bindApi() {
        this.bindRoutes([
            {
                root: '/settings',
                path: '/create',
                method: 'post',
                func: this.createSetting,
                middlewares: [
                    new ValidatorMiddlewareService(CreateSettingDtoIn, this.loggerService),
                ],
            },
            {
                root: '/settings',
                path: '/updateSettingByTitle',
                method: 'put',
                func: this.updateSetting,
                middlewares: [
                    new ValidatorMiddlewareService(UpdateSettingDtoIn, this.loggerService),
                ],
            },
            {
                root: '/settings',
                path: '/deleteSettingByTitle',
                method: 'delete',
                func: this.deleteSetting,
            },
            {
                root: '/settings',
                path: '/all',
                method: 'get',
                func: this.findAll,
            },
            {
                root: '/settings',
                path: '/getByTitle',
                method: 'get',
                func: this.getSettingByTitle,
            },
        ]);
    }

    public async createSetting(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.newsService.createSetting(
                String(req.headers.userid),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'SettingsController'));
        }
    }

    public async updateSetting(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.newsService.updateSettingByTitle(
                String(req.query.title),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {}
    }

    public async deleteSetting(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.newsService.deleteSettingByTitle(String(req.query.title), next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'SettingsController'));
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.newsService.getSettings(next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'SettingsController'));
        }
    }

    public async getSettingByTitle(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.newsService.getSettingByTitle(String(req.query.title), next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'SettingsController'));
        }
    }
}
