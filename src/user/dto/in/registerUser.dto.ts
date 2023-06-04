import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDtoIn {
    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    private login: string;

    @Length(4, 50)
    @IsIn(['admin', 'user'])
    @IsString()
    @IsNotEmpty()
    private role: string;

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
