import { Resolver, Query } from '@nestjs/graphql';
import { Message } from './app.model';

@Resolver(() => Message)
export class AppResolver {
  @Query(() => Message)
  sayHello(): Message {
    return { hello: 'world' };
  }
}
