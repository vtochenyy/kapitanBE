import {
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from 'class-validator';

export class CreateOrderDtoIn {
    @IsDateString()
    @IsNotEmpty()
    targetDate: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    buisnessLunchId?: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsNotEmpty()
    dishes: string[];
}
