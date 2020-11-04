import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Currency {
    @Field()
    currency: string;

    @Field()
    value: number;

    @Field()
    major_value: string;

    @Field()
    display: string;
}
