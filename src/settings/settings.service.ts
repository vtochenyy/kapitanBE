import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { BaseRepository } from '../common/base.repository';
import { ISettingsService } from './settings.service.interface';
import { baseAnswer } from '../common/baseAnswer';
import { HttpError } from '../errors/http-error.class';
import 'reflect-metadata';

@injectable()
export class SettingsService implements ISettingsService {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.SettingsRepository)
        private settingsRepository: BaseRepository
    ) {}

    public async createSetting(adminId: string, params: any, next: NextFunction) {
        try {
            const ifRecordExsists = await this.settingsRepository
                .findByCriteria({ title: params.title })
                .then((x) => !!x[0]);
            let data = {};
            if (ifRecordExsists) {
                data = await this.settingsRepository.updateByParams(
                    { title: params.title },
                    { description: params.description }
                );
            } else {
                params = { ...params, createdBy: adminId };
                data = await this.settingsRepository.create(params);
            }
            return baseAnswer(201, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'SettingsService'));
        }
    }

    public async updateSettingByTitle(title: string, params: any, next: NextFunction) {
        try {
            const data = await this.settingsRepository.updateByParams({ title: title }, params);
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'SettingsService'));
        }
    }

    public async deleteSettingByTitle(title: string, next: NextFunction) {
        try {
            const data = await this.settingsRepository.deleteByParams({ title: title });
            if (!!data.error) {
                throw new Error(data.error);
            }
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'SettingsService'));
        }
    }

    public async getSettings(next: NextFunction) {
        try {
            const data = await this.settingsRepository.findByCriteria(
                {},
                {
                    orderBy: [{ createdAt: 'desc' }],
                }
            );
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'SettingsService'));
        }
    }

    public async getSettingByTitle(title: string, next: NextFunction) {
        try {
            const data = await this.settingsRepository
                .findByCriteria(
                    { title: title },
                    {
                        orderBy: [{ createdAt: 'desc' }],
                    }
                )
                .then((x) => x[0]);
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'SettingsService'));
        }
    }
}
