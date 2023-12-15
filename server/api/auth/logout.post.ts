export default defineEventHandler(async event => {
    const config = useRuntimeConfig();

    deleteCookie(event, config.cookieName, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    setResponseStatus(event, 200);
    return;
});
