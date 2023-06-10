import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IControllerInteface } from '../common/controller.inteface';
import { ValidatorMiddlewareService } from '../middlewares/validator/validatorMiddleware.service';
import { IMentionsService } from './mentions.service.interface';
import { CreateMentionDtoIn } from './dto/in/createMention.dto';
import 'reflect-metadata';

@injectable()
export class MentionsController extends BaseController implements IControllerInteface {
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.MentionsService) private mentionsService: IMentionsService
    ) {
        super(loggerService);
        this.bindApi();
    }

    public bindApi() {
        this.bindRoutes([
            {
                root: '/mentions',
                path: '/create',
                method: 'post',
                func: this.create,
                middlewares: [
                    new ValidatorMiddlewareService(CreateMentionDtoIn, this.loggerService),
                ],
            },
            {
                root: '/mentions',
                path: '/updateById',
                method: 'put',
                func: this.updateById,
                middlewares: [
                    new ValidatorMiddlewareService(CreateMentionDtoIn, this.loggerService),
                ],
            },
            {
                root: '/mentions',
                path: '/deleteById',
                method: 'delete',
                func: this.deleteById,
            },
            {
                root: '/mentions',
                path: '/all',
                method: 'get',
                func: this.findAll,
            },
            {
                root: '/mentions',
                path: '/findById',
                method: 'get',
                func: this.findById,
            },
        ]);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.mentionsService.createMention(
                String(req.headers.userid),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MentionsController'));
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.mentionsService.updateMentionById(
                String(req.query.id),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {}
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.mentionsService.deleteMentionById(String(req.query.id), next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MentionsController'));
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.mentionsService.getAllMentions(next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MentionsController'));
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.mentionsService.findMentionById(String(req.query.id), next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'MentionsController'));
        }
    }
}
