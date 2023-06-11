import { NextFunction } from 'express';

export interface IPhotoAlbumService {
    createPhotoAlbum(
        adminId: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    getAllPhotoAlbums(
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    getPhotoAlbumById(
        id: string,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
}
