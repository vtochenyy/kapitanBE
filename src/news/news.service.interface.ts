import { NextFunction } from 'express';

export interface INewsService {
    createNew(
        adminId: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    updateNewById(
        recordId: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    deleteNewById(
        recordId: string,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
}
