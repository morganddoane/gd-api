import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    username: string;

    @Field()
    password: string;
}

@InputType()
export class EditUserInput {
    @Field({ nullable: true })
    firstName: string;

    @Field({ nullable: true })
    lastName: string;

    @Field({ nullable: true })
    email: string;
}
