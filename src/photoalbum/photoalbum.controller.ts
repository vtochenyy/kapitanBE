import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IControllerInteface } from '../common/controller.inteface';
import 'reflect-metadata';
import { IPhotoAlbumService } from './photoalbum.service.interface';

@injectable()
export class PhotoAlbumController extends BaseController implements IControllerInteface {
    constructor(
        @inject(TYPES.Logger) private loggerService: ILogger,
        @inject(TYPES.PhotoalbumService) private photoAlbumService: IPhotoAlbumService
    ) {
        super(loggerService);
        this.bindApi();
    }

    public bindApi() {
        this.bindRoutes([
            {
                root: '/photoalbum',
                path: '/create',
                method: 'post',
                func: this.createPhotoAlbum,
            },
            {
                root: '/photoalbum',
                path: '/all',
                method: 'get',
                func: this.getAllPhotoAlbums,
            },
            {
                root: '/photoalbum',
                path: '/findById',
                method: 'get',
                func: this.getPhotoAlbumById,
            },
        ]);
    }

    public async createPhotoAlbum(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.photoAlbumService.createPhotoAlbum(
                String(req.headers.userid),
                req.body,
                next
            );
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'SettingsController'));
        }
    }

    public async getAllPhotoAlbums(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.photoAlbumService.getAllPhotoAlbums(next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'SettingsController'));
        }
    }

    public async getPhotoAlbumById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.photoAlbumService.getPhotoAlbumById(String(req.query.id), next);
            data && res.status(data.status).send(data);
        } catch (e) {
            next(new HttpError(400, 'Bad Request', 'SettingsController'));
        }
    }
}
