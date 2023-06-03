import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IControllerInteface } from '../common/controller.inteface';
import { ValidatorMiddlewareService } from '../middlewares/validator/validatorMiddleware.service';
import { INewsService } from './teachers.service.interface';
import { CreateNewDtoIn } from './dto/in/createTeacher.dto';
import 'reflect-metadata';

@injectable()
export class TeachersController extends BaseController implements IControllerInteface {
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.NewsService) private newsService: INewsService
    ) {
        super(loggerService);
        this.bindApi();
    }

    public bindApi() {
        this.bindRoutes([
            {
                root: '/news',
                path: '/createNew',
                method: 'post',
                func: this.createNew,
                middlewares: [new ValidatorMiddlewareService(CreateNewDtoIn, this.loggerService)],
            },
            {
                root: '/news',
                path: '/updateNewById',
                method: 'put',
                func: this.updateNew,
                middlewares: [new ValidatorMiddlewareService(CreateNewDtoIn, this.loggerService)],
            },
            {
                root: '/news',
                path: '/deleteNewById',
                method: 'delete',
                func: this.deleteNew,
            },
            {
                root: '/news',
                path: '/all',
                method: 'get',
                func: this.findAll,
            },
        ]);
    }

    public async createNew(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.newsService.createNew(
                String(req.headers.userid),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'TeachersController'));
        }
    }

    public async updateNew(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.newsService.updateNewById(String(req.query.id), req.body, next);
            data && res.status(data.status).send(data);
        } catch (e) {}
    }

    public async deleteNew(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.newsService.deleteNewById(String(req.query.id), next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'TeachersController'));
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.newsService.getAllNews(next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'TeachersController'));
        }
    }
}
