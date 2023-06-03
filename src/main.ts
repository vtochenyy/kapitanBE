import { Container } from "inversify";
import { App } from "./app";
import { TYPES } from "./types";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { IDatabaseService } from "./db/databaseService.interface";
import { DatabaseService } from "./db/database.service";
import { BaseRepository } from "./common/base.repository";
import { IControllerInteface } from "./common/controller.inteface";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ExeptionFilter } from "./errors/exeption.filter";
import { IIncomingQueryLogsMiddlewareInterface } from "./middlewares/logs/incomingQueryLogsMiddleware.interface";
import { IncomingQueryLogsMeddlewareService } from "./middlewares/logs/incomingQueryLogsMeddleware.service";
import { IncomingQueryLogsRepository } from "./middlewares/logs/incomingQueryLogs.repository";
import { AdminRepository } from "./admin/admin.repository";
import { AdminService } from "./admin/admin.service";
import { AdminController } from "./admin/admin.controller";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { UserRepository } from "./user/user.repository";
import { NewsRepository } from './news/news.repository';
import { INewsService } from './news/news.service.interface';
import { NewsService } from './news/news.service';
import { NewsController } from './news/news.controller';
import "reflect-metadata";
import { ContactsRepository } from './contacts/contacts.repository';
import { ContactsService } from './contacts/contacts.service';
import { ContactsController } from './contacts/contacts.controller';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';
import { SettingsRepository } from './settings/settings.repository';

const appContainer: Container = new Container();

function bindDeps(): void {
  appContainer.bind<App>(TYPES.Application).to(App).inSingletonScope();
  appContainer.bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
  appContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  appContainer.bind<IDatabaseService>(TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
  appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
  appContainer.bind<IIncomingQueryLogsMiddlewareInterface>(TYPES.IncomingQueryLogsMeddlewareService).to(IncomingQueryLogsMeddlewareService).inRequestScope();
  appContainer.bind<BaseRepository>(TYPES.IncomingQueryLogsRepository).to(IncomingQueryLogsRepository).inSingletonScope();
  appContainer.bind<BaseRepository>(TYPES.AdminRepository).to(AdminRepository).inSingletonScope();
  appContainer.bind<AdminService>(TYPES.AdminService).to(AdminService).inSingletonScope();
  appContainer.bind<IControllerInteface>(TYPES.AdminController).to(AdminController).inSingletonScope();
  appContainer.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
  appContainer.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
  appContainer.bind<BaseRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
  appContainer.bind<BaseRepository>(TYPES.NewsRepository).to(NewsRepository).inSingletonScope();
  appContainer.bind<INewsService>(TYPES.NewsService).to(NewsService).inSingletonScope();
  appContainer.bind<NewsController>(TYPES.NewsController).to(NewsController).inSingletonScope();
  appContainer.bind<BaseRepository>(TYPES.ContactsRepository).to(ContactsRepository).inSingletonScope();
  appContainer.bind<ContactsService>(TYPES.ContactsService).to(ContactsService).inSingletonScope();
  appContainer.bind<ContactsController>(TYPES.ContactsController).to(ContactsController).inSingletonScope();
  appContainer.bind<BaseRepository>(TYPES.SettingsRepository).to(SettingsRepository).inSingletonScope();
  appContainer.bind<SettingsController>(TYPES.SettingsController).to(SettingsController).inSingletonScope();
  appContainer.bind<SettingsService>(TYPES.SettingsService).to(SettingsService).inSingletonScope();

}

bindDeps();
const app: App = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };