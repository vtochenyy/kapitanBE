import {
    IsEmpty,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class DishCreateDtoIn {
    @IsString()
    @IsNotEmpty()
    private name: string;

    @IsString()
    @IsNotEmpty()
    private weight: string;

    @IsPositive()
    @IsInt()
    @Min(0)
    @Max(1000)
    private protein: number;

    @IsPositive()
    @IsInt()
    @Min(0)
    @Max(1000)
    private fats: number;

    @IsPositive()
    @IsInt()
    @Min(0)
    @Max(1000)
    private carbohydrates: number;

    @IsPositive()
    @IsNumber()
    @Min(0)
    @Max(10000)
    private calories: number;

    @IsEmpty()
    private createdAt: string;

    @IsNumber()
    @IsPositive()
    @Min(0)
    @Max(1000)
    private price: number;
}
