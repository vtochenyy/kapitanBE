import {
    IsEmpty,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class DishUpdateDtoIn {
    @IsEmpty()
    private id: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    private name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    private weight: string;

    @IsOptional()
    @IsPositive()
    @IsInt()
    @Min(0)
    @Max(1000)
    private protein: number;

    @IsOptional()
    @IsPositive()
    @IsInt()
    @Min(0)
    @Max(1000)
    private fats: number;

    @IsOptional()
    @IsPositive()
    @IsInt()
    @Min(0)
    @Max(1000)
    private carbohydrates: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(0)
    @Max(10000)
    private calories: number;

    @IsEmpty()
    private createdAt: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(0)
    @Max(1000)
    private price: number;
}
