import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IControllerInteface } from '../common/controller.inteface';
import { ValidatorMiddlewareService } from '../middlewares/validator/validatorMiddleware.service';
import { CreateInfoDtoIn } from './dto/in/createSetting.dto';
import { UpdateInfoDtoIn } from './dto/in/updateSetting.dto';
import 'reflect-metadata';
import { ISettingsService } from './settings.service.interface';

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
                middlewares: [new ValidatorMiddlewareService(CreateInfoDtoIn, this.loggerService)],
            },
            {
                root: '/settings',
                path: '/updateSettingByTitle',
                method: 'put',
                func: this.updateSetting,
                middlewares: [new ValidatorMiddlewareService(UpdateInfoDtoIn, this.loggerService)],
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
}
