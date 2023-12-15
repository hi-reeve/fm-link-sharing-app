import { nanoid } from "nanoid";
type ToastStore = {
    id?: string;
    type: "success" | "error";
    title?: string;
    message: string;
};
export const toastStore = () => useState<ToastStore[]>("toast", () => []);
export const useToast = () => (toast: ToastStore) =>
    toastStore().value.push({
        ...toast,
        id: toast.id || nanoid(),
    });
