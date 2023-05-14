import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, Length } from 'class-validator';

export class CreateBuisnessLunchDtoIn {
    @IsDateString()
    @IsNotEmpty()
    private targetDate: string;

    @IsArray()
    @ArrayMinSize(1)
    private buisnessLunchDishes: string[];
}
