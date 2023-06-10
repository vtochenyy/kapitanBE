import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IControllerInteface } from '../common/controller.inteface';
import { ValidatorMiddlewareService } from '../middlewares/validator/validatorMiddleware.service';
import { ITeacherService } from './teachers.service.interface';
import { CreateTeacherDtoIn } from './dto/in/createTeacher.dto';
import { UpdateTeacherDtoIn } from './dto/in/updateTeacher.dto';
import 'reflect-metadata';

@injectable()
export class TeachersController extends BaseController implements IControllerInteface {
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.TeachersService) private teachersService: ITeacherService
    ) {
        super(loggerService);
        this.bindApi();
    }

    public bindApi() {
        this.bindRoutes([
            {
                root: '/teachers',
                path: '/create',
                method: 'post',
                func: this.createNew,
                middlewares: [
                    new ValidatorMiddlewareService(CreateTeacherDtoIn, this.loggerService),
                ],
            },
            {
                root: '/teachers',
                path: '/updateById',
                method: 'put',
                func: this.updateNew,
                middlewares: [
                    new ValidatorMiddlewareService(UpdateTeacherDtoIn, this.loggerService),
                ],
            },
            {
                root: '/teachers',
                path: '/deleteById',
                method: 'delete',
                func: this.deleteNew,
            },
            {
                root: '/teachers',
                path: '/all',
                method: 'get',
                func: this.findAll,
            },
            {
                root: '/teachers',
                path: '/findByAggregation',
                method: 'get',
                func: this.findByAggregation,
            },
        ]);
    }

    public async createNew(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.teachersService.createTeacher(
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
            const data = await this.teachersService.updateTeacherById(
                String(req.query.id),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {}
    }

    public async deleteNew(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.teachersService.deleteTeacherById(String(req.query.id), next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'TeachersController'));
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.teachersService.getAllTeachers(next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'TeachersController'));
        }
    }

    public async findByAggregation(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.teachersService.getAllNewsWithContains(
                String(req.query.aggregation),
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'NewsController'));
        }
    }
}
