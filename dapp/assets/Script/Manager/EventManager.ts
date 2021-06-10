import { Handler } from "../Framework/Handler";
import { EventMessageType } from "./EventMessageType";

class EventListener {
    public msgHandler = null;
    public msgPriority = 0;

    constructor() {
        this.msgHandler = null;
        this.msgPriority = 0;
    }
}

export class EventManager {
    private static _instance: EventManager = null;
    private m_eventListeners = [];

    constructor() {
        if (EventManager._instance) {
            throw new Error("Error: Instantiation failed: Use EventManagerClass.getInstance() instead of new.");
        }
        EventManager._instance = this;
        this.m_eventListeners = [];

        for (let index = 0; index < EventMessageType.EventCount + 1; index++) {
            this.m_eventListeners.push([]);
        }
    }

    // priority more small more early
    // 1 , 2, 3, 100 , 101 ...
    public AddEventListener(type: EventMessageType, handler: Handler, priority = 100): void {
        if (handler == null) return;
        for (let i = this.m_eventListeners[type].length - 1; i >= 0; i--) {
            if (this.m_eventListeners[type][i].msgHandler == handler) return;
        }

        const el = new EventListener();
        el.msgHandler = handler;
        el.msgPriority = priority;
        for (let i = 0; i < this.m_eventListeners[type].length; i++) {
            if (priority < this.m_eventListeners[type][i].msgPriority) {
                this.m_eventListeners[type].splice(i, 0, el);
                return;
            }
        }

        this.m_eventListeners[type].push(el);
    }

    public RemoveEventListener(type: EventMessageType, handler: Handler): void {
        if (handler == null) return;

        for (let i = this.m_eventListeners[type].length - 1; i >= 0; i--) {
            if (this.m_eventListeners[type][i].msgHandler == handler) this.m_eventListeners[type].splice(i, 1);
        }
    }

    // private Handler(messageType: EventMessageType, args: unknown[]) {}

    /// <summary>
    /// Does the event.
    /// </summary>
    /// <param name="type">The type.</param>
    /// <param name="args">The arguments.</param>
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public DoEvent(type: EventMessageType, ...args): void {
        for (let i = 0; i < this.m_eventListeners[type].length; i++) {
            (this.m_eventListeners[type][i].msgHandler as Handler).runWith([type, args]);
        }
    }

    public static get Instance(): EventManager {
        if (EventManager._instance == null) EventManager._instance = new EventManager();

        return EventManager._instance;
    }
}
