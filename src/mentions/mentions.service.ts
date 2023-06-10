import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { BaseRepository } from '../common/base.repository';
import { IMentionsService } from './mentions.service.interface';
import { baseAnswer } from '../common/baseAnswer';
import { HttpError } from '../errors/http-error.class';
import 'reflect-metadata';
import { UserRepository } from '../user/user.repository';

@injectable()
export class MentionsService implements IMentionsService {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.MentionsRepository)
        private mentionsRepository: BaseRepository,
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

    public async createMention(adminId: string, params: any, next: NextFunction) {
        try {
            params = { ...params, createdBy: adminId };
            const data = await this.mentionsRepository.create(params);
            return baseAnswer(201, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'MentionsService'));
        }
    }

    public async updateMentionById(recordId: string, params: any, next: NextFunction) {
        try {
            const data = await this.mentionsRepository.update(recordId, params);
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'MentionsService'));
        }
    }

    public async deleteMentionById(recordId: string, next: NextFunction) {
        try {
            const data = await this.mentionsRepository.deleteById(recordId);
            if (!!data.error) {
                throw new Error(data.error);
            }
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'MentionsService'));
        }
    }

    public async getAllMentions(next: NextFunction) {
        try {
            const data = await this.mentionsRepository.findByCriteria(
                {},
                {
                    orderBy: [{ createdAt: 'desc' }],
                    include: { User: true },
                }
            );
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'MentionsService'));
        }
    }

    public async findMentionById(id: string, next: NextFunction) {
        try {
            const data = await this.mentionsRepository
                .findByCriteria({ id: id }, { include: { User: true } })
                .then((x) => x[0]);
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'MentionsService'));
        }
    }
}
