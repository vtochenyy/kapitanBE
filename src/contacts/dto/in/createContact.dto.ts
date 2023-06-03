import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateContactDtoIn {
    @IsString()
    @IsNotEmpty()
    @Length(1, 15)
    private phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private position: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 1000000)
    private photo?: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private name: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private lastname: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private middlename: string;
}
