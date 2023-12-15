<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
});
const props = defineProps<{
    name: string;
    defaultValue?: string;
    label?: string;
    icon?: string;
}>();
const { name, defaultValue } = toRefs(props);
const { value, errorMessage } = useField<string | undefined>(name, undefined, {
    initialValue: defaultValue,
});
const attrs = useAttrs();
</script>

<template>
    <label :for="name" flex flex-col bg-transparent text-black text-sm>
        <span
            v-if="label"
            mb-1
            :class="{
                'text-error': errorMessage,
                'text-black': !errorMessage,
            }"
            >{{ label }}</span
        >
        <div relative>
            <div
                v-if="icon"
                :class="icon"
                w-4
                h-4
                absolute
                left-4
                top-4.5
                text-accent
            />
            <input
                v-model="value"
                :id="name"
                class="border rounded-2 py-3 text-black w-full transition-all duration-300 ease-in-out focus:ring-none focus:outline-0 focus-visible:ring-none focus-visible:outline-0"
                :class="{
                    'pl-10': icon,
                    'pl-4': !icon,
                    'border-accent-2  focus:shadow-custom focus:shadow-primary/25':
                        !errorMessage,
                    'border-error  focus:border-error ': !!errorMessage,
                }"
                v-bind="attrs"
            />
            <transition
                enter-active-class="transition-all duration-300 ease-in-out"
                enter-from-class="opacity-0 -translate-y-3"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-300 ease-in-out"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-3"
            >
                <span
                    v-if="errorMessage"
                    text-error
                    text-sm
                    absolute
                    right-4
                    top-4
                    bg-transparent
                >
                    {{ errorMessage }}
                </span>
            </transition>
        </div>
    </label>
</template>
