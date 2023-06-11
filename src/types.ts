import { ExeptionFilter } from './errors/exeption.filter';
import { IncomingQueryLogsMeddlewareService } from './middlewares/logs/incomingQueryLogsMeddleware.service';
import { IncomingQueryLogsRepository } from './middlewares/logs/incomingQueryLogs.repository';
import { AdminRepository } from './admin/admin.repository';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { NewsRepository } from './news/news.repository';
import { NewsService } from './news/news.service';
import { NewsController } from './news/news.controller';
import { ContactsRepository } from './contacts/contacts.repository';
import { ContactsService } from './contacts/contacts.service';
import { ContactsController } from './contacts/contacts.controller';
import { PhotoalbumRepository } from './photoalbum/photoalbum.repository';
import { PhotoRepository } from './photoalbum/photo.repository';
import { PhotoalbumService } from './photoalbum/photoalbum.service';
import { PhotoAlbumController } from './photoalbum/photoalbum.controller';

export const TYPES = {
    Application: Symbol.for('Application'),
    Logger: Symbol.for('Logger'),
    ConfigService: Symbol.for('ConfigService'),
    DatabaseService: Symbol.for('DatabaseService'),
    ExeptionFilter: Symbol.for('ExeptionFilter'),
    IncomingQueryLogsMeddlewareService: Symbol.for('IncomingQueryLogsMeddlewareService'),
    IncomingQueryLogsRepository: Symbol.for('IncomingQueryLogsRepository'),
    AdminRepository: Symbol.for('AdminRepository'),
    AdminService: Symbol.for('AdminService'),
    AdminController: Symbol.for('AdminController'),
    UserController: Symbol.for('UserController'),
    UserService: Symbol.for('UserService'),
    UserRepository: Symbol.for('UserRepository'),
    NewsRepository: Symbol.for('NewsRepository'),
    NewsService: Symbol.for('NewsService'),
    NewsController: Symbol.for('NewsController'),
    ContactsRepository: Symbol.for('ContactsRepository'),
    ContactsService: Symbol.for('ContactsService'),
    ContactsController: Symbol.for('ContactsController'),
    SettingsRepository: Symbol.for('SettingsRepository'),
    SettingsService: Symbol.for('SettingsService'),
    SettingsController: Symbol.for('SettingsController'),
    MentionsRepository: Symbol.for('MentionsRepository'),
    MentionsService: Symbol.for('MentionsService'),
    MentionsController: Symbol.for('MentionsController'),
    TeachersRepository: Symbol.for('TeachersRepository'),
    TeachersService: Symbol.for('TeachersService'),
    TeachersController: Symbol.for('TeachersController'),
    PhotoalbumRepository: Symbol.for('PhotoalbumRepository'),
    PhotoRepository: Symbol.for('PhotoRepository'),
    PhotoalbumService: Symbol.for('PhotoalbumService'),
    PhotoAlbumController: Symbol.for('PhotoAlbumController'),
};
