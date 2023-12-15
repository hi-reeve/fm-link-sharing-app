export default defineEventHandler(async event => {
    const session = await getUserSession(event);
    if (session) {
        event.context.user = session;
    }
});
