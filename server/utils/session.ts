import type { H3Event } from "h3";

export type SessionPayload = {
    userId: string;
};
export async function getUserSession(event: H3Event) {
    const config = useRuntimeConfig();

    const cookie = getCookie(event, config.cookieName);
    if (!cookie) return null;

    const unsignedSession = unsign(cookie, config.cookieSecret);
    if (!unsignedSession) return null;

    const session = deserialize(unsignedSession) as SessionPayload | null;

    return session;
}
