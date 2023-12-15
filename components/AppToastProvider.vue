<script setup lang="ts">
import { toastStore } from "@/composables/toast";
</script>

<template>
    <ToastProvider>
        <ToastRoot
            v-for="toast in toastStore"
            :key="toast.id"
            bg-white
            rounded-2
            px-6
            py-4
            class="data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out-fade data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        >
            <div flex items-center space-x-4>
                <div>
                    <ToastTitle
                        font-bold
                        text-black
                        flex
                        space-x-1
                        items-center
                    >
                        <div
                            v-if="toast.type === 'success'"
                            i-bxs-check-circle
                            text-primary
                        />
                        <div
                            v-if="toast.type === 'error'"
                            i-bxs-x-circle
                            text-error
                        />
                        <span>
                            {{
                                toast.title
                                    ? toast.title
                                    : toast.type === "success"
                                    ? "Success"
                                    : "Error"
                            }}
                        </span>
                    </ToastTitle>
                    <ToastDescription text-sm>
                        {{ toast.message }}
                    </ToastDescription>
                </div>
                <ToastClose
                    w-6
                    h-6
                    i-bx-x
                    opacity-75
                    hover:opacity-100
                    transition-all
                    duration-300
                    ease-in-out
                />
            </div>
        </ToastRoot>

        <ToastViewport
            class="fixed bottom-6 gap-y-2 right-6 flex flex-col max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
        />
    </ToastProvider>
</template>
