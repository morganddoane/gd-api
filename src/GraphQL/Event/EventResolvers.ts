import { Authorized, Query, Resolver } from 'type-graphql';
import { Event } from './Event';
import { EventbriteClass } from '../../services/Eventbrite';

const Eventbrite = new EventbriteClass();

@Resolver(() => Event)
export class EventResolvers {
    @Authorized()
    @Query(() => [Event])
    async events(): Promise<Event[]> {
        return await Eventbrite.getEvents();
    }
}
