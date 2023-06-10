import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { BaseRepository } from '../common/base.repository';
import { ITeacherService } from './teachers.service.interface';
import { baseAnswer } from '../common/baseAnswer';
import { HttpError } from '../errors/http-error.class';
import 'reflect-metadata';

@injectable()
export class TeachersService implements ITeacherService {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.TeachersRepository)
        private teachersRepository: BaseRepository
    ) {}

    public async createTeacher(adminId: string, params: any, next: NextFunction) {
        try {
            params = { ...params, createdBy: adminId };
            const data = await this.teachersRepository.create(params);
            return baseAnswer(201, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'TeachersService'));
        }
    }

    public async updateTeacherById(recordId: string, params: any, next: NextFunction) {
        try {
            const data = await this.teachersRepository.update(recordId, params);
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'TeachersService'));
        }
    }

    public async deleteTeacherById(recordId: string, next: NextFunction) {
        try {
            const data = await this.teachersRepository.deleteById(recordId);
            if (!!data.error) {
                throw new Error(data.error);
            }
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'TeachersService'));
        }
    }

    public async getAllTeachers(next: NextFunction) {
        try {
            const data = await this.teachersRepository.findByCriteria(
                {},
                {
                    orderBy: [{ createdAt: 'desc' }],
                }
            );
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'TeachersService'));
        }
    }

    public async getAllNewsWithContains(aggregation: string, next: NextFunction) {
        try {
            const data = await this.teachersRepository.findByCriteria(
                {
                    OR: [
                        {
                            lastname: {
                                contains: aggregation,
                            },
                        },
                        {
                            name: {
                                contains: aggregation,
                            },
                        },
                        {
                            middlename: {
                                contains: aggregation,
                            },
                        },
                    ],
                },
                {
                    orderBy: [{ createdAt: 'desc' }],
                }
            );
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'NewsService'));
        }
    }
}
