import { Field, InputType } from 'type-graphql';
import { DimensionUnit } from './Enums';

@InputType()
export class Dimensions {
    @Field(() => DimensionUnit)
    units: DimensionUnit;

    @Field()
    length: number;

    @Field()
    width: number;

    @Field()
    height: number;
}
