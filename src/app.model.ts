import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  hello: string;
}