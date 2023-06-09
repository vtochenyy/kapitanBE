import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSettingDtoIn {
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private title: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 1000)
    private description: string;
}
