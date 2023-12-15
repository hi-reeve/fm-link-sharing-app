import { type SessionPayload } from "~/server/utils/session";

export const useAuthUser = () =>
    useState<SessionPayload | null>("user", () => null);
