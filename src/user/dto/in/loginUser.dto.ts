import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDtoIn {
    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    private login: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 50)
    private password: string;
}
