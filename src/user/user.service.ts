import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { UserRepository } from './user.repository';
import { NextFunction } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IDatabaseService } from '../db/databaseService.interface';
import { baseAnswer } from '../common/baseAnswer';
import { RegisterUserDtoIn } from './dto/in/registerUser.dto';

@injectable()
export class UserService {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository,
        @inject(TYPES.DatabaseService) private databaseService: IDatabaseService
    ) {}

    public async registerUser(params: RegisterUserDtoIn, next: NextFunction) {
        try {
            let result = {};
            await this.databaseService.client.$transaction(async () => {
                try {
                    result = await this.userRepository.create(params);
                } catch (e) {
                    throw new Error(String(e));
                }
            });
            return baseAnswer(201, result, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'UserService'));
        }
    }

    public async login(params: { login: string; password: string }, next: NextFunction) {
        try {
            const targetUser = await this.userRepository
                .findByCriteria({ login: params.login })
                .then((x) => x[0]);
            if (!!targetUser) {
                if (params.password === targetUser.password) {
                    return baseAnswer(200, { isAuth: true, data: targetUser }, {});
                } else {
                    throw new Error(
                        'User with this login found, but provided passwod is incorrect'
                    );
                }
            } else {
                throw new Error('User with this login was not found');
            }
        } catch (e) {
            next(new HttpError(500, String(e), 'UserService'));
        }
    }

    public async findAll(next: NextFunction) {
        try {
            const data = await this.userRepository.findAll();
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'UserService'));
        }
    }

    public async findById(id: string, next: NextFunction) {
        try {
            const data = await this.userRepository.findRecordById(id);
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'UserService'));
        }
    }
}
