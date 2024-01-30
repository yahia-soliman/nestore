import { PartialType } from "@nestjs/mapped-types";
import {
    IsAlpha, IsDateString, IsNotEmpty, IsUUID,
    Length, IsNumber, IsPositive, IsIn,
    IsOptional
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
    createdAt: String;

    @IsUUID()
    @IsOptional()
    userId?: string;

    @IsUUID()
    @IsOptional()
    orderId?: string;
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}