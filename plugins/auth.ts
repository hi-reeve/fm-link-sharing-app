export default defineNuxtPlugin(async () => {
    const { getSession } = useAuth();

    await getSession(undefined);
    console.log("plugin");
});
