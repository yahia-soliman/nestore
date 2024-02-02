import { PartialType } from "@nestjs/mapped-types";
import {
    IsAlpha, IsDateString, IsNotEmpty,
    Length, IsNumber, IsPositive, IsIn,
    IsOptional, IsMongoId
} from "class-validator";

export class CreateOrderDto {

    @IsAlpha()
    @Length(3, 64)
    @IsNotEmpty()
    name: string;

    @IsIn(['fruits', 'market', 'clothes'])
    category: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;

    @IsDateString()
    @IsOptional()
    created_at: String;

    @IsOptional()
    @IsMongoId()
    user_id: string;
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}