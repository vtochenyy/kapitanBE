import express, { Express } from 'express';
import { Server } from 'http';
import cors from 'cors';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IConfigService } from './config/config.service.interface';
import timeout from 'connect-timeout';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IIncomingQueryLogsMiddlewareInterface } from './middlewares/logs/incomingQueryLogsMiddleware.interface';
import { AdminController } from './admin/admin.controller';
import { responseHeaderSetterMiddleware } from './middlewares/responseHeaderSetter.middleware';
import { UserController } from './user/user.controller';
import { IDatabaseService } from './db/databaseService.interface';
import { NewsController } from './news/news.controller';
import 'reflect-metadata';
import { ContactsController } from './contacts/contacts.controller';
import { SettingsController } from './settings/settings.controller';
import { MentionsController } from './mentions/mentions.controller';
import { TeachersController } from './teachers/teachers.controller';
import { PhotoAlbumController } from './photoalbum/photoalbum.controller';

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
        @inject(TYPES.IncomingQueryLogsMeddlewareService)
        private incomingQueryLogsMeddlewareService: IIncomingQueryLogsMiddlewareInterface,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.AdminController) private adminController: AdminController,
        @inject(TYPES.DatabaseService) private databaseService: IDatabaseService,
        @inject(TYPES.NewsController) private newsController: NewsController,
        @inject(TYPES.ContactsController) private contactsController: ContactsController,
        @inject(TYPES.SettingsController) private settingsController: SettingsController,
        @inject(TYPES.MentionsController) private mentionsController: MentionsController,
        @inject(TYPES.TeachersController) private teachersController: TeachersController,
        @inject(TYPES.PhotoAlbumController) private photoAlbumController: PhotoAlbumController
    ) {
        this.app = express();
        this.port = +this.configService.get('SERVER_PORT');
    }

    public useRoutes() {
        this.app.options('*', cors({ credentials: true, origin: 'http://localhost:3000' }));
        this.app.use(express.json({ limit: this.configService.get('REQUEST_JSON_LIMIT') }));
        this.app.use(express.urlencoded({ limit: this.configService.get('REQUEST_SIZE_LIMIT') }));
        this.app.use(timeout(+this.configService.get('SERVER_TIMEOUT_ON_REQUEST')));
        this.app.use(responseHeaderSetterMiddleware);
        this.app.use(
            this.incomingQueryLogsMeddlewareService.log.bind(
                this.incomingQueryLogsMeddlewareService
            )
        );
        this.app.use('/admin', this.adminController.router);
        this.app.use('/user', this.userController.router);
        this.app.use('/news', this.newsController.router);
        this.app.use('/contacts', this.contactsController.router);
        this.app.use('/settings', this.settingsController.router);
        this.app.use('/mentions', this.mentionsController.router);
        this.app.use('/teachers', this.teachersController.router);
        this.app.use('/photoalbum', this.photoAlbumController.router);
    }

    public useErrorValidation() {
        this.app.use(this.exeptionFilter.catch.bind(this));
    }

    public async init() {
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Server running at port: ${this.port}`);
            this.databaseService.connect();
            this.useRoutes();
            this.useErrorValidation();
        });
    }
}
