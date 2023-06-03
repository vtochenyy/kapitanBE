import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTeacherDtoIn {
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private name: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 1000)
    private lastname: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 1000)
    private middlename: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 1000)
    private position: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 1000000)
    private preview_img?: string;
}
