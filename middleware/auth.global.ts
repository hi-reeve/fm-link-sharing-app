export default defineNuxtRouteMiddleware(async to => {
    const user = useAuthUser();

    //if logged in but access guest route
    if (user.value && !to.meta.auth) return navigateTo({ name: "dashboard" });
    else if (!user.value && to.meta.auth)
        return navigateTo({ name: "auth-login" });
});
