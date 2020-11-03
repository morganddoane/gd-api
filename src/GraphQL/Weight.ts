import { Field, InputType } from 'type-graphql';
import { WeightUnit } from './Enums';

@InputType()
export class Weight {
    @Field()
    value: number;

    @Field(() => WeightUnit)
    units: WeightUnit;
}
