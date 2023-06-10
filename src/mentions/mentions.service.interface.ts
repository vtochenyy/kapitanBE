import { NextFunction } from 'express';

export interface IMentionsService {
    createMention(
        adminId: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    updateMentionById(
        recordId: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    deleteMentionById(
        recordId: string,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    findMentionById(
        id: string,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    getAllMentions(
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
}
