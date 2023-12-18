import type { Account } from "~/db/schema/account";
import { type SessionPayload } from "~/server/utils/session";

type LoginResponse = {
    user: Omit<Account, "password">;
};
export const useAuthUser = () =>
    useState<SessionPayload | null>("user", () => null);

export const useAuth = () => {
    const authUser = useAuthUser();
    const toast = useToast();
    const setAuthUser = (user: SessionPayload | null) => {
        authUser.value = user;
    };

    const { loading: loadingLogin, mutate: login } = useMutation<
        Pick<Account, "email" | "password">,
        LoginResponse
    >(
        body =>
            $fetch("/api/auth/login", {
                method: "POST",
                body,
            }),
        {
            onSuccess: async dt => {
                setAuthUser({
                    userId: dt.user.id,
                });
                toast({
                    type: "success",
                    message: `Welcome ${dt.user.email}`,
                });
                await navigateTo({
                    name: "dashboard",
                });
            },
            onError: err => {
                toast({
                    type: "error",
                    message: err.statusMessage,
                });
            },
        }
    );

    const { mutate: getSession } = useMutation<
        undefined,
        SessionPayload | null
    >(
        () =>
            $fetch("/api/auth/session", {
                headers: useRequestHeaders(["cookie"]),
            }),
        {
            onSuccess: dt => {
                setAuthUser(dt);
            },
        }
    );

    const { mutate: logout } = useMutation(
        () => $fetch("/api/auth/logout", { method: "POST" }),
        {
            onSuccess: async () => {
                setAuthUser(null);
                toast({
                    type: "success",
                    message: "Logout success",
                });
                await navigateTo({
                    name: "auth-login",
                });
            },
        }
    );

    return {
        loadingLogin,
        login,
        logout,
        getSession,
    };
};
