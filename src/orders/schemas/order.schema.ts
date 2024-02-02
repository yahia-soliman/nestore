import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({versionKey: false})
export class Order
{
    @Prop({
        required: true,
        minlength: 3,
        maxlength: 64,
    })
    name: string;

    @Prop({type: Number})
    quantity: number;

    @Prop()
    created_at: string;

    @Prop({
        type: Types.ObjectId
    })
    user_id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);