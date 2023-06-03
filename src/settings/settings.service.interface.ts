import { NextFunction } from 'express';

export interface ISettingsService {
    createSetting(
        adminId: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    updateSettingByTitle(
        title: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    deleteSettingByTitle(
        title: string,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    getSettings(
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    getSettingByTitle(
        title: string,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
}
