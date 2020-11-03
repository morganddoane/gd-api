import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Rate {
    @Field()
    serviceName: string;

    @Field()
    serviceCode: string;

    @Field()
    shipmentCost: string;

    @Field()
    otherCost: string;
}
