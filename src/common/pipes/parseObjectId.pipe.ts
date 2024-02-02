import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string) {
    if (isValidObjectId(value)) return value;
    else throw new BadRequestException(
      {
        "message": `${value} is not a valid id`,
        "error": "Bad Request",
        "statusCode": 400
      }
    );
  }
}