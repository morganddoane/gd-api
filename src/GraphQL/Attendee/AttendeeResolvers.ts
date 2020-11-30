import { EventbriteClass } from '@src/services/Eventbrite';
import { NoteModel } from '@src/services/Mongo/Note';
import {
    Arg,
    Authorized,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';
import { Attendee } from './Attendee';

import { notes } from '@src/services/Mongo/notes';

const Eventbrite = new EventbriteClass();

@Resolver(() => Attendee)
export class AttendeeResolvers {
    @Authorized()
    @Query(() => [Attendee])
    async attendees(@Arg('eventId') eventId: string): Promise<Attendee[]> {
        const res = await Eventbrite.getEventAttendees(eventId);

        return res;
    }

    // @Mutation(() => Boolean)
    // async loadNotes(): Promise<boolean> {
    //     for (const note of notes) {
    //         await NoteModel.create({
    //             attendee: note.attendee,
    //             note: note.note ? note.note : '',
    //             user: '5fb8a9440051ae22f407e743',
    //         });
    //     }

    //     return true;
    // }

    @FieldResolver()
    async note(@Root() attendee: Attendee): Promise<string | null> {
        const res = await NoteModel.findOne({ attendee: attendee.id });

        if (!res) return null;

        return res.note;
    }
}
