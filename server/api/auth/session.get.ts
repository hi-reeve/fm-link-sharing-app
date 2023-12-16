export default defineEventHandler(async event => {
    const sessionUser = event.context.user;
    if (!sessionUser) return null;

    return sessionUser;
});
