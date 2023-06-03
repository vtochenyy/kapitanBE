import { NextFunction } from 'express';

export interface ITeacherService {
    createTeacher(
        adminId: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    updateTeacherById(
        recordId: string,
        params: any,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    deleteTeacherById(
        recordId: string,
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
    getAllTeachers(
        next: NextFunction
    ): Promise<{ status: number; data: any; paging: Object } | undefined>;
}
