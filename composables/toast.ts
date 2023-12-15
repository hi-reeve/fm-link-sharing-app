import { nanoid } from "nanoid";
type ToastStore = {
    id?: string;
    type: "success" | "error";
    title?: string;
    message: string;
};
export const toastStore = reactive<ToastStore[]>([]);
export const useToast = () => (toast: ToastStore) =>
    toastStore.push({
        ...toast,
        id: toast.id || nanoid(),
    });
