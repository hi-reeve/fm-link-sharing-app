export default defineEventHandler(async event => {
    const user = await getUserSession(event);

    if (user) event.context.user = user;
});
