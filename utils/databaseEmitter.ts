import { EventEmitter } from 'events';

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
