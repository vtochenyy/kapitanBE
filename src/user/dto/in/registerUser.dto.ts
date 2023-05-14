import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDtoIn {
    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    private login: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    private password: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    private name: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    private lastname: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    private middlename: string;
}
