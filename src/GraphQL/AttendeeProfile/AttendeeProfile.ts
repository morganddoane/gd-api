import { Field, ObjectType } from 'type-graphql';
import { AttendeeAddress } from '../AttendeeAddress/AttendeeAdress';

@ObjectType()
export class AttendeeProfile {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field({ nullable: true })
    prefix?: string;

    @Field({ nullable: true })
    suffix?: string;

    @Field({ nullable: true })
    age?: number;

    @Field({ nullable: true })
    job_title?: string;

    @Field({ nullable: true })
    company?: string;

    @Field({ nullable: true })
    website?: string;

    @Field({ nullable: true })
    blog?: string;

    @Field({ nullable: true })
    gender?: string;

    @Field({ nullable: true })
    birth_date?: Date;

    @Field({ nullable: true })
    cell_phone?: string;

    @Field(() => AttendeeAddress, { nullable: true })
    addresses?: AttendeeAddress;
}
