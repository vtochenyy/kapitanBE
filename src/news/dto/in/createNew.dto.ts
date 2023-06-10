import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateNewDtoIn {
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private title: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 1000)
    private description: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 10000000)
    private preview_img?: string;
}
