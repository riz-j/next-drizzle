import { EventEmitter } from 'events';

export enum NotificationEvent {
    Insert = "Insert",
    Update = "Update",
    Delete = "Delete"
}

export enum PayloadType {
    Country = "Country",
    State = "State",
    City = "City"
}

export type NotificationSome = {
    id: number,
    event: NotificationEvent,
    payloadType: PayloadType,
    payload: object 
}

export class DatabaseEmitter { 
    private static emitter: EventEmitter | null = null;

    private constructor() { }  // Private constructor to prevent direct instantiation

    static getInstance(): EventEmitter {
        if (!this.emitter) {
            this.emitter = new EventEmitter();
            console.log("New event emitter made");
        } else {
            console.log("Existing event emitter returned");
        }
        return this.emitter;
    }
}
