import { EventbriteClass } from '@src/services/Eventbrite';
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Attendee } from './Attendee';

const Eventbrite = new EventbriteClass();

@Resolver(() => Attendee)
export class AttendeeResolvers {
    @Authorized()
    @Query(() => [Attendee])
    async attendees(@Arg('eventId') eventId: string): Promise<Attendee[]> {
        const res = await Eventbrite.getEventAttendees(eventId);

        return res;
    }
}
