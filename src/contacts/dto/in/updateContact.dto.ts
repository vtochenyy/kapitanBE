import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateContactDtoIn {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(1, 15)
    private phoneNumber: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private position: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 1000000)
    private photo?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private lastname: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private middlename: string;
}
