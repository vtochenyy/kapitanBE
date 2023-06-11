import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { BaseRepository } from '../common/base.repository';
import { IPhotoAlbumService } from './photoalbum.service.interface';
import { baseAnswer } from '../common/baseAnswer';
import { HttpError } from '../errors/http-error.class';
import 'reflect-metadata';

@injectable()
export class PhotoalbumService implements IPhotoAlbumService {
    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.PhotoalbumRepository)
        private photoalbumRepository: BaseRepository,
        @inject(TYPES.PhotoRepository)
        private photoRepository: BaseRepository
    ) {}

    public async createPhotoAlbum(adminId: string, params: any, next: NextFunction) {
        try {
            const album = await this.photoalbumRepository.create({
                title: params.title,
                description: params.description ?? null,
                createdBy: adminId,
            });
            const prepareData = params.images.map((image: string) => ({
                photo: image,
                albumId: album.id,
                createdBy: adminId,
            }));
            const photos = await this.photoRepository.createMany(prepareData);
            return baseAnswer(201, { images: photos, album: album }, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'PhotoalbumService'));
        }
    }

    public async getAllPhotoAlbums(next: NextFunction) {
        try {
            const data = await this.photoalbumRepository.findAll();
            return baseAnswer(200, data, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'PhotoalbumService'));
        }
    }

    public async getPhotoAlbumById(id: string, next: NextFunction) {
        try {
            const photoalbum = await this.photoalbumRepository
                .findByCriteria(
                    { id: id },
                    { orderBy: [{ createdAt: 'desc' }], include: { Photo: true, User: true } }
                )
                .then((x) => x[0]);
            return baseAnswer(200, photoalbum, {});
        } catch (e) {
            next(new HttpError(500, String(e), 'PhotoalbumService'));
        }
    }
}
