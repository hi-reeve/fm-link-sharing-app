import { SessionPayload } from "./utils/session";

declare module "h3" {
    interface H3EventContext {
        user?: SessionPayload;
    }
}

export {};
