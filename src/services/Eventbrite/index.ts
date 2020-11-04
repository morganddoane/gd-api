import { Attendee } from '@src/GraphQL/Attendee/Attendee';
import { Event } from '@src/GraphQL/Event/Event';
import {
    RESTDataSource,
    RequestOptions,
    HTTPCache,
} from 'apollo-datasource-rest';

export class EventbriteClass extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://www.eventbriteapi.com/v3/';
        this.httpCache = new HTTPCache();
    }

    willSendRequest(req: RequestOptions): void {
        req.headers.set(
            'Authorization',
            `Bearer ${process.env.EVENTBRITE_TOKEN}`
        );
    }

    async getEvents(): Promise<Event[]> {
        let continuation = null;
        const records = [];
        let keepGoing = true;

        while (keepGoing == true) {
            const string = `organizations/${
                process.env.EVENTBRITE_ORGANIZATION
            }/events/${continuation ? `?continuation=${continuation}` : ''}`;
            const response = await this.get(string);
            response.events.forEach((r) => records.push(r));
            if (response.pagination.continuation)
                continuation = response.pagination.continuation;
            if (response.pagination.has_more_items == false) keepGoing = false;
        }

        return records.map((e) => {
            console.log(e);
            const event = new Event();
            event.name = {
                text: e.name.text,
                html: e.name.html,
            };
            event.summary = e.summary;
            event.description = {
                text: e.description.text,
                html: e.description.html,
            };
            event.url = e.url;
            event.start = {
                timezone: e.start.timezone,
                local: new Date(e.start.local),
                utc: new Date(e.start.utc),
            };
            event.end = {
                timezone: e.end.timezone,
                local: new Date(e.end.local),
                utc: new Date(e.end.utc),
            };
            event.created = new Date(e.created);
            event.changed = new Date(e.changed);
            event.published = new Date(e.published);
            event.status = e.status;
            event.currency = e.currency;
            event.online_event = e.online_event;
            event.hide_start_date = e.hide_start_date;
            event.hide_end_date = e.hide_end_date;
            return event;
        });
    }

    async getEventAttendees(eventId: string): Promise<Attendee> {
        const res = await this.get(`events/${eventId}/attendees`);

        return res.attendees;
    }

    async getEventById(eventId: string): Promise<Event> {
        const response = await this.get(
            `organizations/${process.env.eventbriteOrganizationId}/events/${eventId}`
        );
        return response[0];
    }
}
