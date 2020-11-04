import { Field, ObjectType } from 'type-graphql';
import { EventStatus } from '../Enums';

@ObjectType()
export class MultiPartText {
    @Field()
    text: string;

    @Field()
    html: string;
}

@ObjectType()
export class EventTime {
    @Field()
    timezone: string;

    @Field()
    utc: Date;

    @Field()
    local: Date;
}

@ObjectType()
export class Event {
    @Field()
    name: MultiPartText;

    @Field({ nullable: true })
    summary?: string;

    @Field(() => MultiPartText, { nullable: true })
    description?: MultiPartText;

    @Field()
    url: string;

    @Field(() => EventTime)
    start: EventTime;

    @Field(() => EventTime)
    end: EventTime;

    @Field()
    created: Date;

    @Field()
    changed: Date;

    @Field()
    published: Date;

    @Field(() => EventStatus)
    status: EventStatus;

    @Field()
    currency: string;

    @Field()
    online_event: boolean;

    @Field()
    hide_start_date: boolean;

    @Field()
    hide_end_date: boolean;
}
