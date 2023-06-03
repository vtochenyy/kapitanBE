import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IControllerInteface } from '../common/controller.inteface';
import { ValidatorMiddlewareService } from '../middlewares/validator/validatorMiddleware.service';
import { IContactsService } from './contacts.service.interface';
import { CreateContactDtoIn } from './dto/in/createContact.dto';
import 'reflect-metadata';
import { UpdateContactDtoIn } from './dto/in/updateContact.dto';

@injectable()
export class ContactsController extends BaseController implements IControllerInteface {
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.ContactsService) private contactsService: IContactsService
    ) {
        super(loggerService);
        this.bindApi();
    }

    public bindApi() {
        this.bindRoutes([
            {
                root: '/contacts',
                path: '/createContact',
                method: 'post',
                func: this.createContact,
                middlewares: [
                    new ValidatorMiddlewareService(CreateContactDtoIn, this.loggerService),
                ],
            },
            {
                root: '/contacts',
                path: '/updateContactById',
                method: 'put',
                func: this.updateContact,
                middlewares: [
                    new ValidatorMiddlewareService(UpdateContactDtoIn, this.loggerService),
                ],
            },
            {
                root: '/contacts',
                path: '/deleteContactById',
                method: 'delete',
                func: this.deleteContact,
            },
            {
                root: '/contacts',
                path: '/all',
                method: 'get',
                func: this.findAll,
            },
        ]);
    }

    public async createContact(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.contactsService.createContact(
                String(req.headers.userid),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'ContactsController'));
        }
    }

    public async updateContact(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.contactsService.updateContactById(
                String(req.query.id),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {}
    }

    public async deleteContact(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.contactsService.deleteContactById(String(req.query.id), next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'ContactsController'));
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.contactsService.getAllContacts(next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'ContactsController'));
        }
    }
}
