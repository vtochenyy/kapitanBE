import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateInfoDtoIn {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    private title: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(4, 1000)
    private description: string;
}
