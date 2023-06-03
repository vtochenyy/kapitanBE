import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { BaseRepository } from '../common/base.repository';
import { IContactsService } from './contacts.service.interface';
import { baseAnswer } from '../common/baseAnswer';
import { HttpError } from '../errors/http-error.class';
import 'reflect-metadata';

@injectable()
export class ContactsService implements IContactsService {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.ContactsRepository)
        private contactsRepository: BaseRepository
    ) {}

    public async createContact(adminId: string, params: any, next: NextFunction) {
        try {
            params = { ...params, createdBy: adminId };
            const data = await this.contactsRepository.create(params);
            return baseAnswer(201, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'ContactsService'));
        }
    }

    public async updateContactById(recordId: string, params: any, next: NextFunction) {
        try {
            const data = await this.contactsRepository.update(recordId, params);
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'ContactsService'));
        }
    }

    public async deleteContactById(recordId: string, next: NextFunction) {
        try {
            const data = await this.contactsRepository.deleteById(recordId);
            if (!!data.error) {
                throw new Error(data.error);
            }
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'ContactsService'));
        }
    }

    public async getAllContacts(next: NextFunction) {
        try {
            const data = await this.contactsRepository.findByCriteria(
                {},
                {
                    orderBy: [{ createdAt: 'desc' }],
                }
            );
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'ContactsService'));
        }
    }
}
