import { NextFunction } from 'express';

export interface IContactsService {
    createContact(
        adminId: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    updateContactById(
        recordId: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    deleteContactById(
        recordId: string,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    getAllContacts(
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
}
