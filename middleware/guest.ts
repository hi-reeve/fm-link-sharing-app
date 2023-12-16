export default defineNuxtRouteMiddleware(async () => {
    const user = useAuthUser();

    if (user.value) {
        if (process.server) return navigateTo({ name: "dashboard" });

        return abortNavigation();
    }
});
