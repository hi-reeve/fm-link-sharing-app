export default defineNuxtRouteMiddleware(async () => {
    const user = useAuthUser();
    console.log("middleware guest", user.value);
    if (user.value) {
        console.log(user.value);
        if (process.server) return navigateTo({ name: "dashboard" });

        return abortNavigation();
    }
});
