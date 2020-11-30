import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { UserDocumentClass } from '../User';

export class NoteDocumentClass {
    @prop({
        ref: () => UserDocumentClass,
        required: true,
    })
    public user!: Ref<UserDocumentClass>;

    @prop({ required: true })
    public attendee!: string;

    @prop({ required: false })
    public note: string;
}

export const NoteModel = getModelForClass(NoteDocumentClass);
