export interface IAttendee {
    id: string;
    created: string;
    changed: string;
    ticket_class_id: string;
    variant_id: string;
    ticket_class_name: string;
    quantity: number;
    costs: IAttendee_Cost;
    profile: IAttendee_Profile;
    questions?: IAttendee_Questions;
    answers?: IAttendee_Answers;
    cancelled: boolean;
    refunded: boolean;
    status: string;
    event_id: string;
    order_id: string;
    delivery_method: string;
}

interface ICostBody {
    currency: string;
    value: number;
    major_value: string;
    display: string;
}

export interface IAttendee_Cost {
    base_price: ICostBody;
    gross: ICostBody;
    eventbrite_fee: ICostBody;
    payment_fee: ICostBody;
    tax: ICostBody;
}

interface IEventbriteAddress {
    address_1: string;
    address_2: string;
    city: string;
    region: string;
    postal_code: string;
    country: string;
    latitude: string;
    longitude: string;
    localized_address_display: string;
    localized_area_display: string;
    localized_multi_line_address_display: string[];
}

export interface IAttendee_Profile {
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    prefix?: string;
    suffix?: string;
    age?: number;
    job_title?: string;
    company?: string;
    website?: string;
    blog?: string;
    gender?: string;
    birth_date?: Date;
    cell_phone?: string;
    work_phone?: string;
    addresses: {
        home?: IEventbriteAddress;
        ship?: IEventbriteAddress;
        work?: IEventbriteAddress;
        bill?: IEventbriteAddress;
    };
}

export interface IAttendee_Questions {
    id: string;
    label: string;
    type: string;
    required: boolean;
}
[];

export interface IAttendee_Answers {
    question_id: string;
    attendee_id: string;
    question: string;
    type: string;
    answer: string;
}
[];
