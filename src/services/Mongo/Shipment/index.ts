import {
    DocumentType,
    getModelForClass,
    prop,
    Ref,
} from '@typegoose/typegoose';
import { UserDocumentClass, UserModel } from '../User';

export enum ShipmentStatus {
    Neutral = 'neutral',
    Voided = 'voided',
}

export class ShipmentDocumentClass {
    @prop({
        ref: () => UserDocumentClass,
        required: true,
    })
    public processedBy!: Ref<UserDocumentClass>;

    @prop({ required: true })
    public attendee!: string;

    @prop({ required: true })
    public shipmentId!: string;

    @prop({ required: false })
    public labelData?: string;

    @prop({ required: true })
    public status!: ShipmentStatus;

    public async getProcessedBy(
        this: DocumentType<ShipmentDocumentClass>
    ): Promise<DocumentType<UserDocumentClass>> {
        return await UserModel.findById(this.processedBy);
    }
}

export const ShipmentModel = getModelForClass(ShipmentDocumentClass);
