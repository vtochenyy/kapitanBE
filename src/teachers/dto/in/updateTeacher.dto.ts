import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTeacherDtoIn {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 1000)
    private lastname: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 1000)
    private middlename: string;

    @IsOptional()
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
