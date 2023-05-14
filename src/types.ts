import { DishService } from './dish/dish.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { IncomingQueryLogsMeddlewareService } from './middlewares/logs/incomingQueryLogsMeddleware.service';
import { IncomingQueryLogsRepository } from './middlewares/logs/incomingQueryLogs.repository';
import { MenuService } from './menu/menu.service';
import { MenuController } from './menu/menu.controller';
import { AdminRepository } from './admin/admin.repository';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { MenuRepository } from './menu/menu.repository';
import { DishToMenuRepository } from './menu/dishToMenu.repository';
import { BuisnessLunchRepository } from './menu/buisnessLunch.repository';
import { DishToBuisnessLunchRepository } from './menu/dishToBuisnessLunch.repository';

export const TYPES = {
    Application: Symbol.for('Application'),
    Logger: Symbol.for('Logger'),
    ConfigService: Symbol.for('ConfigService'),
    DatabaseService: Symbol.for('DatabaseService'),
    DishRepository: Symbol.for('DishRepository'),
    DishService: Symbol.for('DishService'),
    DishController: Symbol.for('DishController'),
    ExeptionFilter: Symbol.for('ExeptionFilter'),
    IncomingQueryLogsMeddlewareService: Symbol.for('IncomingQueryLogsMeddlewareService'),
    IncomingQueryLogsRepository: Symbol.for('IncomingQueryLogsRepository'),
    MenuService: Symbol.for('MenuService'),
    MenuController: Symbol.for('MenuController'),
    AdminRepository: Symbol.for('AdminRepository'),
    AdminService: Symbol.for('AdminService'),
    AdminController: Symbol.for('AdminController'),
    UserController: Symbol.for('UserController'),
    UserService: Symbol.for('UserService'),
    UserRepository: Symbol.for('UserRepository'),
    MenuRepository: Symbol.for('MenuRepository'),
    DishToMenuRepository: Symbol.for('DishToMenuRepository'),
    BuisnessLunchRepository: Symbol.for('BuisnessLunchRepository'),
    DishToBuisnessLunchRepository: Symbol.for('DishToBuisnessLunchRepository'),
};
